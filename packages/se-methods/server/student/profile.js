const [prefix, protect] = ['Student', 'student'];

Helpers.Methods({ prefix, protect }, {
  UserSave: Helpers.DefaultSave,

  PlanProfileSave(planProfile) {
    const user = Meteor.user();
    user.set('planProfile', planProfile.raw());

    Check.Astro(user).valid();
    user.save();
    return user;
  },

  CourseIngress(courseId) {
    const userId = Meteor.userId();

    // Find course to update
    const course = _.head(Fetch.General.courses(courseId).fetch());

    // Ingress current student on course
    course.push('students', userId);
    Check.Astro(course).valid();
    course.save();

    // Find school document
    const school = _.head(Fetch.General.users(course.get('author')).fetch());

    // Remind! Not always course author is a user school
    if (school) {
      // Ingress student on school
      const student = _.head(Fetch.General.users(userId).fetch());
      student.set('profile.school', school.get('_id'));
      const studentSchools = student.get('profile.schools') || [];
      studentSchools.push(school.get('_id'));
      _.uniq(studentSchools);
      student.set('profile.schools', studentSchools);
      Check.Astro(student).valid();
      student.save();
    };

    return course;
  },

  AddEmail(id, email) {
    Accounts.addEmail(id, email);
    return true;
  },

  SendVerificationEmail(id, email) {
    Accounts.sendVerificationEmail(id, email);
    return true;
  },
});

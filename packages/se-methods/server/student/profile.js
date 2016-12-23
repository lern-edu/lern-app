const [prefix, protect] = ['Student', 'student'];

Helpers.Methods({ prefix, protect }, {
  PlanProfileSave(planProfile) {
    const user = Meteor.user();
    user.set('planProfile', planProfile.raw());

    Check.Astro(user).valid();
    user.save();
    return user;
  },

  CourseIngress(alias) {
    const userId = Meteor.userId();

    if (Courses.update({ alias }, { $push: { students: userId } }) == 1) {
      return Courses.findOne({ alias });
    } else {
      throw 'Error';
    }
  },
});

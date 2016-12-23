Fetch.School = function (schoolId) {
  return {
    teachers() {
      const selector = { roles: 'teacher', 'profile.school': schoolId };
      return Fetch.General.users(selector);
    },

    students() {
      const selector = { roles: 'student', 'profile.school': schoolId };
      return Fetch.General.users(selector);
    },

    users() {
      const selector = { 'profile.school': schoolId };
      return Fetch.General.users(selector);
    },

    courses() {
      const selector = { author: schoolId };
      return Fetch.General.courses(selector);
    },
  };
};

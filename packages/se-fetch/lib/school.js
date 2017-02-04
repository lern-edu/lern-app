Fetch.School = function (schoolId) {
  return {
    teachers() {
      const selector = { roles: 'teacher', 'profile.schools': schoolId };
      return Fetch.General.users(selector);
    },

    students() {
      const selector = { roles: 'student', 'profile.schools': schoolId };
      return Fetch.General.users(selector);
    },

    users() {
      const selector = { 'profile.schools': schoolId };
      return Fetch.General.users(selector);
    },

    courses() {
      const selector = { author: schoolId };
      return Fetch.General.courses(selector);
    },
  };
};

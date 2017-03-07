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

    courses(query) {
      const selector = { author: schoolId };
      if (query) _.assign(selector, query);
      return Fetch.General.courses(selector);
    },
  };
};

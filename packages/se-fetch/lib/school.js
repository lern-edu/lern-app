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

    tests(query) {
      const courses = _.map(
        Fetch.General.courses({ author: schoolId }, { fields: { _id: 1 } }).fetch(),
        '_id'
      );
      const selector = {
        $or: [
          { author: schoolId },
          { course: { $in: courses } },
        ],
      };
      if (query)
        _.assign(
          selector,
          _.isString(query)
          ? { _id: query } : _.isObject(query)
          ? query : {}
        );
      return Fetch.General.tests(selector);
    },
  };
};

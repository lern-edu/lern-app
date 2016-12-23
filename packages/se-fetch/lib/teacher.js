Fetch.Teacher = function (teacherId) {
  return {
    questions() {
      const selector = { author: teacherId };
      return Fetch.General.questions(selector);
    },

    courses() {
      const selector = { teachers: teacherId };
      return Fetch.General.courses(selector);
    },
  };
};

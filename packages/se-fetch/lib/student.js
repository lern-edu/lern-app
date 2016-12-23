Fetch.Student = function (studentId) {
  return {
    courses() {
      const selector = { students: studentId };
      return Fetch.General.courses(selector);
    },

    tests({ testId, type }={}) {
      const selector = { type, _id: testId };
      if (testId);
      else if (type === 'plans') selector.students = studentId;
      else if (type === 'personal') selector.author = studentId;
      else selector.$or = [{ students: studentId }, { author: studentId }];
      return Fetch.General.tests(selector);
    },
  };
};

const [prefix, protect] = ['School', 'school'];

Helpers.Publications({ type: 'plain', prefix, protect }, {
  Teachers() {
    const { userId } = this;
    return Fetch.School(userId).teachers();
  },

  Students() {
    const { userId } = this;
    return Fetch.School(userId).students();
  },

  Users() {
    const { userId } = this;
    return Fetch.School(userId).users();
  },

  Courses({ courseIds }={}) {
    const { userId } = this;
    const selector = courseIds ? { _id: courseIds } : null;
    return Fetch.School(userId).courses(selector);
  },
});

Helpers.Publications({ type: 'composite', prefix, protect }, {
  Tests({ testId=null }, { questions, subjects, tags, course }={}) {
    return {
      find() {
        const { userId } = this;
        const selector = testId || {
          author: userId,
        };

        return Fetch.General.tests(selector);
      },

      children: [
        {
          find(tests) {
            return questions && tests.findQuestions();
          },

          children: [
            {
              find(question) {
                return question.findAllImages();
              },
            },
          ],
        },

        {
          find(tests) {
            return subjects && tests.findSubjects();
          },
        },

        {
          find(tests) {
            return tags && tests.findTags();
          },
        },

        {
          find(tests) {
            return course && tests.findCourse();
          },
        },

        {
          find(tests) {
            return tests.findDocuments();
          },
        },
      ],

    };
  },
});

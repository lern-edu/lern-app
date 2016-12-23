const [prefix, protect] = ['Admin', 'admin'];

Helpers.Publications({ type: 'plain', prefix, protect }, {
  Users(arg) {
    return Fetch.General.users(arg);
  },

  SchoolUsers(schoolId) {
    return Fetch.School(schoolId).users();
  },

  Courses(selector={}) {
    return Fetch.General.courses(selector);
  },

  Images(imageIds={}) {
    return Fetch.General.images(imageIds);
  },

  SchoolCourses({ schoolId: author }={}) {
    const name = _.map(Fetch.General.users({ roles: 'school' },
      { fields: { profile: 1 } }).fetch(), 'profile.name');
    return Fetch.General.courses(author ? { author } : { name: { $in: name } });
  },

});

Helpers.Publications({ type: 'composite', prefix, protect }, {
  Plans({ planId }={}, { subjects }={}) {
    return {
      find() {
        return Fetch.General.plans(planId);
      },

      children: [
        {
          find(plan) {
            return subjects && plan.findSubjects();
          },
        },
      ],
    };
  },

  Tests({ testId=null }, { questions, subjects, tags, course }={}) {
    return {
      find() {
        const selector = testId || {
          author: { $in: _.map(Meteor.users.find(
            { roles: 'admin' },
            { fields: { _id: 1 } }).fetch(), '_id'), },
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

  Questions({ tags, subject, text, type }={}, { limit=1, skip=0 }={}) {
    return {
      find() {
        const { userId } = this;
        const selector = {};
        const options = { limit, skip, sort: { createdAt: 1 } };

        if (_.isNull(tags)) _.assign(selector, { tags: { $eq: [] } });
        else if (!_.isEmpty(tags)) _.assign(selector, { tags: { $in: tags } });
        if (subject) _.assign(selector, { subject });
        if (type) _.assign(selector, { type });
        if (text) {
          _.assign(selector, { $text: { $search: text } });
          _.assign(options, { sort: { score: { $meta: 'textScore' } },
            fields: { score: { $meta: 'textScore' } }, });
        };

        return Questions.find(selector, options);
      },

      children: [
        {
          find(question) {
            return question && question.findAllImages();
          },
        },
      ],
    };
  },

});

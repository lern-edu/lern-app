const [prefix, protect] = ['Teacher', 'teacher'];

Helpers.Publications({ type: 'plain', prefix, protect }, {
  Questions({ own, tags }={}, limit) {
    const { userId } = this;
    const selector = { tags, author: own ? userId : { $ne: userId } };
    const options = { sort: { createdAt: -1 }, limit };
    return Fetch.Public().questions(selector, options);
  },

  TestsFind(selector={}, { text=null, order='ascending' }={}, { limit=1, skip=0 }) {
    const options = { limit, skip, sort:
      { createdAt: _.get({ ascending: 1, decending: -1 }, order) }, };

    if (!(selector.subjects || selector.tags || selector.course) && text) {
      _.assign(selector, { $text: { $search: text } });
      _.assign(options, { sort: { score: { $meta: 'textScore' } },
        fields: { score: { $meta: 'textScore' } }, });
    };

    return Tests.find(selector, options);
  },
});

Helpers.Publications({ type: 'composite', prefix, protect }, {

  Courses({ courseId }={}, { posts,
    users,
    tests,
    lectures,
    attempts,
    answers,
    questions,
    subjects,
    tags,
    grades, }={}) {
    const { userId } = this;
    return {
      find() {
        const course = Fetch.General.courses({ _id: courseId, teachers: userId });
        return course;
      },

      children: [
        {
          find(course) {
            return subjects && course.findSubjects();
          },
        }, {
          find(course) {
            return grades && course.findGrades();
          },
        }, {
          find(course) {
            return tags && course.findTags();
          },
        }, {
          find(course) {
            return posts && course.findPosts();
          },
        }, {
          find(course) {
            return users && course.findUsers();
          },
        }, {
          find(course) {
            return lectures && course.findLectures();
          },
        }, {
          find(course) {
            return tests && course.findTests();
          },

          children: [
            {
              find(test) {
                return questions && test.findQuestions();
              },
            }, {
              find(test) {
                return attempts && test.findAttempts();
              },

              children: [
                {
                  find(attempt) {
                    return answers && attempt.findAnswers();
                  },
                },
              ],
            },
          ],
        },
      ],
    };
  },

  Lectures({ lectureId }={}, { subjects, tags, course, author, students }) {
    const { userId } = this;
    return {
      find() {
        const lecture = Fetch.General.lectures(lectureId);
        if (lectureId) Check.Cursor(lecture).some();
        return lecture;
      },

      children: [
        {
          find(lecture) {
            return course && lecture.findCourse();
          },

          children: [
            {
              find(course) {
                return students && course.findStudents();
              },
            },
          ],
        }, {
          find(lecture) {
            return author && lecture.findAuthor();
          },
        }, {
          find(lecture) {
            return subjects && lecture.findSubjects();
          },
        }, {
          find(lecture) {
            return tags && lecture.findTags();
          },
        },
      ],
    };
  },

  Post({ postId }={}, { images, documents }={}) {
    const { userId } = this;
    return {
      find() {
        return Fetch.General.posts(postId);
      },

      children: [
        {
          find(post) {
            return post.findImages();
          },
        }, {
          find(post) {
            return post.findDocuments();
          },
        },
      ],
    };
  },

  Test(
    testId,
    { questions, attempts, course, documents, subjects, tags, answers, images, users }={}
  ) {
    const { userId } = this;
    return {
      find() {
        return Fetch.General.tests(testId);
      },

      children: [
        {
          find(test) {
            return questions && test.findQuestions();
          },

          children: [
            {
              find(question) {
                return images && question.findAllImages();
              },
            },
          ],
        }, {
          find(test) {
            return attempts && test.findAttempts();
          },
        }, {
          find(test) {
            return course && test.findCourse();
          },

          children: [
            {
              find(course) {
                return users && course.findUsers();
              },
            },
          ],
        }, {
          find(test) {
            return documents && test.findDocuments();
          },
        }, {
          find(test) {
            return subjects && test.findSubjects();
          },
        }, {
          find(test) {
            return tags && test.findTags();
          },
        }, {
          find(test) {
            return answers && test.findAnswers();
          },
        },
      ],
    };
  },

  QuestionsText({ subject, text, tags, type, onlyMine, course }={}, { limit=1, skip=0 }) {
    return {
      find() {
        const selector = {};
        const options = { limit, skip, sort: { createdAt: 1 } };

        if (!course) return Questions.find(null);
        if (!_.isEmpty(tags)) _.assign(selector, { tags: { $in: tags } });
        if (subject) _.assign(selector, { subject });
        else _.assign(selector, { subject: {
            $in: _.get(Courses.findOne(course), 'subjects'), }, });
        if (onlyMine) _.assign(selector, { author: _.get(this, 'userId') });
        if (type) _.assign(selector, { type });
        if (text) {
          _.assign(selector, { $text: { $search: text } });
          _.assign(options, { sort: { score: { $meta: 'textScore' } },
            fields: { score: { $meta: 'textScore' } }, });
        };

        return Questions.find(_.isEmpty(selector) ? null : selector, options);
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

  Attempt(attemptId, { answers, author }={}) {
    const { userId } = this;
    return {
      find() {
        const attempt = Fetch.General.attempts(attemptId);
        Check.Cursor(attempt).some();
        return attempt;
      },

      children: [
        {
          find(attempt) {
            return answers && attempt.findAnswers();
          },
        }, {
          find(attempt) {
            return author && attempt.findAuthor();
          },
        },
      ],
    };
  },

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

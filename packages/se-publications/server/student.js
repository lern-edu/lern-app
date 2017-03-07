const [prefix, protect] = ['Student', 'student'];

Helpers.Publications({ type: 'plain', prefix, protect }, {
  Images(ids) {
    return Fetch.General.images(ids || []);
  },
});

Helpers.Publications({ type: 'composite', prefix, protect }, {

  Attempts(args, { answers }) {
    const { userId } = this;
    return {
      find() {
        return Fetch.User(userId).attempts(args);
      },

      children: [
        {
          find(attempt) {
            return answers && attempt.findAnswers();
          },
        },
      ],
    };
  },

  CourseByAlias({ alias=null }, { author }={}) {
    return {
      find() {
        return Fetch.General.courses({ alias });
      },

      children: [
        {
          find(course) {
            return author && course.findAuthor();
          },
        },
      ],
    };
  },

  Courses({ courseId }={}, { posts,
    users,
    tests,
    lectures,
    attempts,
    answers,
    questions,
    subjects,
    tags, }={}) {
    const { userId } = this;
    return {
      find() {
        const course = Fetch.General.courses({ _id: courseId, students: userId });
        if (courseId) Check.Cursor(course).some();
        return course;
      },

      children: [
        {
          find(course) {
            return posts && course.findPosts();
          },

          children: [
            {
              find(post) {
                return post.findImages();
              },
            },
            {
              find(post) {
                return post.findDocuments();
              },
            },
          ],
        },
        {
          find(course) {
            return users && course.findUsers();
          },
        },
        {
          find(course) {
            return tags && course.findTags();
          },
        },
        {
          find(course) {
            return subjects && course.findSubjects();
          },
        },
        {
          find(course) {
            return lectures && course.findLectures();
          },
        },
        {
          find(course) {
            return tests && course.findCurrentTests();
          },

          children: [
            {
              find(test) {
                return questions && test.findQuestions();
              },
            },
            {
              find(test) {
                return attempts && test.findAttempts(userId);
              },

              children: [
                {
                  find(attempt) {
                    return answers && attempt.findAnswers(userId);
                  },
                },
              ],
            },
          ],
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

  Test(testId, { questions }={}) {
    const { userId } = this;
    return {
      find() {
        const cursor = Fetch.General.tests(testId);
        Check.Cursor(cursor).some();
        return cursor;
      },

      children: [
        {
          find(test) {
            return questions && test.findQuestions();
          },

          children: [
            {
              find(question) {
                return question.findAllImages();
              },
            },
          ],
        },
      ],
    };
  },

  Attempt(testId, { answers }={}) {
    const { userId } = this;
    return {
      find() {
        const opts = { test: testId, finished: null, last: true };
        return Fetch.User(userId).attempts(opts);
      },

      children: [
        {
          find(attempt) {
            return answers && attempt.findAnswers();
          },
        },
      ],
    };
  },

  Tests(args, { questions, attempts, tags, subjects, course }={}) {
    const { userId } = this;
    return {
      find() {
        const cursor = Fetch.Student(userId).tests(args);
        return cursor;
      },

      children: [
        {
          find(test) {
            return test.findTags();
          },
        },
        {
          find(test) {
            return course && test.findCourse();
          },
        },
        {
          find(test) {
            return test.findSubjects();
          },
        },
        {
          find(test) {
            return attempts && test.findAttempts(userId);
          },
        },
        {
          find(test) {
            return questions && test.findQuestions();
          },

          children: [
            {
              find(question) {
                return question.findAllImages();
              },
            },
          ],
        },
      ],
    };
  },

  Grades() {
    const { userId } = this;
    return {
      find() {
        const opts = { fields: { grade: 1, question: 1, finishedAt: 1 } };
        return Fetch.User(userId).answers();
      },

      children: [
        {
          find(answer) {
            const opts = { fields: { tags: 1, subject: 1 } };
            return answer.findQuestion(opts);
          },

          children: [
            {
              find(question) {
                return question.findTags();
              },
            },
            {
              find(question) {
                return question.findSubject();
              },
            },
          ],
        },
      ],
    };
  },
});

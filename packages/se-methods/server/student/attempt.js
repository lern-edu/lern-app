const [prefix, protect] = ['Student', 'student'];

Helpers.Methods({ prefix, protect }, {
  AttemptStart(testId) {
    Check.Regex(testId).id();
    const { userId } = this;

    // TODO: check if user can attempt

    let test = Fetch.General.tests(testId);

    Check.Cursor(test).some();
    test = _.first(test.fetch());

    let attempt = Fetch.User(userId).attempts({ test: testId, finished: null });
    Check.Cursor(attempt).none();

    attempt = new Attempts.Schema({ test: testId, score: _.sum(test.scores) || null });
    if (test.timeoutType === 'global') attempt.set('maxDuration', test.timeout);

    // else if (test.timeoutType === 'page') _.each(test.get('pages'), p => {
    //   const timeTracked = p.get('timeTracked') || [];
    //   timeTracked.push(new Tests.PageTimeTrackedSchema({ maxDuration: p.get('timeout') }));
    //   attempt.set('timeTracked', timeTracked);
    // });

    Check.Astro(attempt).valid();
    attempt.save();

    return attempt;
  },

  AttemptFinish(testId) {
    Check.Regex(testId).id();
    const { userId } = this;

    let test = Fetch.General.tests(testId);
    Check.Cursor(test).some();
    test = _.first(test.fetch());

    let attempt = Fetch.User(userId).attempts({ test: testId, last: true, finished: null });
    Check.Cursor(attempt).some();
    attempt = _.first(attempt.fetch());

    let answers = Fetch.General.answers({ author: userId,
      question: { $in: test.questions },
      attempt: attempt._id, });
    Check.Cursor(answers).some();
    answers = answers.fetch();

    if (attempt.score && _.every(answers, a => a.type === 'closed')) {
      const grades = _.map(test.questions, (q, index) => {
        let answer = _.first(_.filter(answers, a => _.isEqual(a.question, q)));
        return answer.grade * _.get(test.scores, index);
      });
      attempt.set('grade', (_.sum(grades) / attempt.score));
    };

    attempt.set('finished', true);
    Check.Astro(attempt).valid();

    attempt.save();
    return attempt;
  },
});

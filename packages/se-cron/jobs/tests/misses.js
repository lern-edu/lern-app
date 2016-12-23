TestsMisses = function () {
  const now = moment();
  const subjects = Subjects.find({}, { fields: { name: 1 } }).fetch();

  const answers = Answers.find({
    type: 'closed',
    author: {
      $ne: null,
    },
    grade: {
      $ne: null,
      $lt: 1,
    },
    finishedAt: {
      $gte: now.clone().startOf('day').subtract(1, 'week').toDate(),
    },
  }, {
    fields: {
      question: 1,
      author: 1,
    },
  }).fetch();

  const gs1 = _.reduce(answers, (gs, answer) => {
    if (!gs[answer.author]) gs[answer.author] = [];
    gs[answer.author].push(answer.question);
    return gs;
  }, {});

  const users = Meteor.users.find({
    _id: {
      $in: _.keys(gs1),
    },
    'studyProfile.plansMisses': true,
  }, {
    fields: {
      _id: 1,
    },
  }).fetch();

  _.forEach(_.pick(gs1, _.map(users, '_id')), (qIds, userId) => {
    const questions = Questions.find({ _id: { $in: qIds } }, { fields: { tags: 1, subject: 1 } }).fetch();

    const gs2 = _.groupBy(questions, 'subject');

    _.forEach(gs2, (qs, s) => {
      const test = new Tests.Schema({

        // Static
        course: null,
        type: 'plans',
        scores: null,
        timeout: null,
        timeoutType: 'none',
        author: null,

        // Dynamic
        startDate: now.clone().startOf('day').toDate(),
        endDate: now.clone().endOf('day').toDate(),
        name: `Erradas ${_.get(_.find(subjects, s), 'name')} #${now.week()}`,
        info: `Prova de erradas gerada pelo sistema se-edu. Boa sorte!`,
        questions: _.map(questions, '_id'),
        subjects: _.uniq(_.map(questions, 'subject')),
        tags: _.uniq(_.flatten(_.map(questions, 'tags'))),
        students: [userId],
      });

      // Saving
      Check.Astro(test).valid();
      test.save();
    });
  });
};

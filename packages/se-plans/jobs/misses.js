Jobs.TestsMisses = function () {
  const now = moment(new Date());
  const dayOfWeek = _.findKey(WeekDays.all('both'),
    w => w.toLowerCase() === _.first(now.format('dddd').split('-')));

  const plans = Plans.find().fetch();
  let tasks = [];

  _.forEach(plans, p => {
    const tasks = _.filter(p.weekJobs, t => t.day === dayOfWeek && t.mistakes);

    const students = _.map(Meteor.users.find({
      roles: 'student',
      'planProfile.plan': p._id,
    }).fetch(), '_id');

    const answers = Answers.find({
      type: 'closed',
      author: { $in: students },
      grade: { $ne: null, $lt: 1 },
      finishedAt: {
        $gte: now.clone().startOf('day').subtract(1, 'week').toDate(),
      },
    }, { fields: { question: 1, author: 1 } }).fetch();

    _.forEach(tasks, t => {

      const subject = _.get(Subjects.findOne(t.subject), 'name');

      _.forEach(students, student => {

        const questions = _.map(Questions.find({
          subject: t.subject,
          _id: {
            $in: _.map(_.filter(answers, a =>
              a.author === student), 'question'),
          }, }, { limit: t.size }).fetch(), '_id');

        if (questions.length) {
          const test = new Tests.Schema({

            // Static
            course: null,
            type: 'plans',
            scores: null,
            timeout: null,
            timeoutType: 'none',
            author: null,
            plan: p._id,

            // Dynamic
            startDate: now.clone().startOf('day').toDate(),
            endDate: now.clone().endOf('day').toDate(),
            name: `Erradas ${subject} #${now.week()}`,
            info: `Prova de erradas gerada pelo sistema Sinaap-se. Boa sorte!`,
            subjects: [t.subject],
            tags: _.pullAll(_.uniq(_.flatten(_.map(questions, 'tags'))), [undefined]),
            students: [student],
            questions,
          });

          // Saving
          Check.Astro(test).valid();
          test.save();
        };

      });
    });
  });
};

Jobs.TestsGenerator = function () {
  const now = moment(new Date());
  const dayOfWeek = _.findKey(WeekDays.all('both'),
    w => w.toLowerCase() === _.first(now.format('dddd').split('-')));

  const plans = Plans.find().fetch();
  let tasks = [];

  _.forEach(plans, p =>
    tasks = _.map(_.union(_.filter(p.weekJobs, t =>
      t.day === dayOfWeek && !t.mistakes), tasks), t => {
        t.plan = p._id;
        return t;
      })
  );

  _.forEach(tasks, t => {
    const students = _.map(Meteor.users.find({
      roles: 'student',
      'planProfile.plan': t.plan,
    }).fetch(), '_id');

    const subject = _.get(Subjects.findOne(t.subject), 'name');

    // Initialize Test
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
      name: `${subject} #${now.week()}`,
      info: `Prova de ${subject} gerada pelo sistema Sinaap-se. Boa sorte!`,
      plan: t.plan,

      // Generated
      subjects: null,
      tags: null,
      students: null,
    });

    // Initial Setup
    const selector = { subject: t.subject, type: 'closed' };
    const questions = { docs: [], ids: [] };
    const total = Questions.find(selector).count();
    let triesLeft = 25;

    // Select Questions
    while (questions.ids.length < t.size && triesLeft) {
      const question = Questions.findOne(selector, { skip: _.random(true) * total });
      if (question && !_.includes(questions.ids, question._id)) {
        questions.docs.push(question);
        questions.ids.push(question._id);
      } else triesLeft--;
    };

    // Settings Generated
    test.set({
      questions: questions.ids,
      subjects: _.uniq(_.map(questions.docs, 'subject')),
      tags: _.compact(_.uniq(_.flatten(_.map(questions.docs, 'tags')))),
      students,
    });

    if (questions.ids.length) {
      // Saving
      Check.Astro(test).valid();
      test.save();
    }

  });

};

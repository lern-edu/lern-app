TestsSubjects = function ({ size }) {
  const now = moment();

  let students = Meteor.users.find({
    roles: 'student',
    'studyProfile.plansSubjects': true,
  }, {
    fields:
    { 'studyProfile.subjects': 1 },
  }).fetch();

  const groups = _.reduce(students, (gs, student) => {
    const subjects = _.sortBy(_.get(student, 'studyProfile.subjects'));
    if (subjects && !_.isEmpty(subjects)) {
      if (!gs[subjects]) gs[subjects] = [];
      gs[subjects].push(student._id);
    } return gs;
  }, {});

  _.forEach(groups, (ids, k) => {
    const subjects = k.split(',');

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
      name: `Específica #${now.week()}`,
      info: `Prova específica gerada pelo sistema se-edu. Boa sorte!`,

      // Generated
      subjects: null,
      tags: null,
      students: null,
    });

    // Initial Setup
    const selector = { subject: { $in: subjects }, type: 'closed' };
    const questions = { docs: [], ids: [] };
    const total = Questions.find(selector).count();
    let triesLeft = 10;

    // Select Questions
    while (questions.ids.length < size && triesLeft) {
      const question = Questions.findOne(selector, { skip: _.random(true) * total });
      if (question && !_.includes(questions.ids, question._id)) {
        questions.docs.push(question);
        questions.ids.push(question._id);
      } else triesLeft--;
    } if (!triesLeft) throw new Meteor.Error('subjects-cron failed');

    // Generate metadata
    const usedTags = _.uniq(_.flatten(_.map(questions.docs, 'tags')));
    const usedSubjects = _.uniq(_.map(questions.docs, 'subject'));

    // Settings Generated
    test.set({
      questions: questions.ids,
      subjects: usedSubjects,
      tags: usedTags,
      students: ids,
    });

    // Saving
    Check.Astro(test).valid();
    test.save();
  });
};

TestsAreas = function ({ sizeEach }) {
  const now = moment();

  // Initialize Test
  const test = new Tests.Schema({

    //Static
    coures: null,
    type: 'plans',
    scores: null,
    timeout: null,
    timeoutType: 'none',
    author: null,

    // Dynamic
    startDate: now.clone().startOf('day').toDate(),
    endDate: now.clone().endOf('day').toDate(),
    name: `Simulado #${now.week()}`,
    info: `Simulado gerada pelo sistema se-edu. Boa sorte!`,

    // Generated
    subjects: null,
    tags: null,
    students: null,
  });

  const questions = { ids: [], docs: [] };
  _.forEach(SubjectAreas.all('keys'), (area, i) => {

    // Initial Setup
    const subjectIds = _.map(Subjects.find({ area }).fetch(), '_id');
    const selector = { subject: { $in: subjectIds }, type: 'closed' };
    const total = Questions.find(selector).count();
    let triesLeft = 10;

    // Select Questions
    while (questions.ids.length < i * sizeEach && triesLeft) {
      const question = Questions.findOne(selector, { skip: _.random(true) * total });
      if (!question || _.includes(questions.ids, question._id)) triesLeft--;
      else {
        questions.docs.push(question._id);
        questions.ids.push(question._id);
      }
    } if (!triesLeft) throw new Meteor.Error('areas-cron failed');
  });

  // Generate metadata
  const usedTags = _.uniq(_.flatten(_.map(questions.docs, 'tags')));
  const usedSubjects = _.uniq(_.map(questions.docs, 'subject'));

  // Settings Generated
  test.set({
    questions: questions.ids,
    subjects: usedSubjects,
    tags: usedTags,
    students: _.map(Meteor.users.find({ roles: 'student', 'studyProfile.plansAreas': true }, { fields: { _id: 1 } }).fetch(), '_id'),
  });

  // Saving
  Check.Astro(test).valid();
  test.save();
};

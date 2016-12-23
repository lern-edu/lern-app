Jobs.Daily = function ({ areaIndex }) {
  const now = moment();
  const plans = Plans.find({}, { sizeSmall: 1, name: 1, [`area${areaIndex}`]: 1 }).fetch();

  _.forEach(plans, plan => {
    const test = new Tests.Schema({
      // Static
      course: null,
      info: 'Boa sorte!',
      type: 'plans',
      scores: null,
      timeout: null,
      timeoutType: 'none',
      author: null,

      // Dynamic
      startDate: now.clone().toDate(),
      endDate: now.clone().add(1, 'minute').toDate(),
      name: `${plan.name} Área ${areaIndex + 1} #${now.week()}`,
      plan: plan._id,

      // Generated
      students: null,
      questions: null,
      subjects: null,
      tags: null,
    });

    const { sizeSmall } = plan;
    const subjectIds = plan.get(`area${areaIndex}`);
    const sizeEach = _.floor(sizeSmall / subjectIds.length);

    const questions = _.flatten(_.map(subjectIds, s => {
      const selector = { subject: s, type: 'closed' };
      const total = Questions.find(selector).count();
      const questions = [];
      const questionIds = [];
      let triesLeft = 10;

      while (questionIds.length < sizeEach && triesLeft) {
        const question = Questions.findOne(selector, { skip: _.random(true) * total });
        if (question && !_.includes(questionIds, question._id)) {
          questions.push(question);
          questionIds.push(question._id);
        } else triesLeft--;
      } if (!triesLeft) console.warn(`Plans.daily.${plan._id}.${areaIndex}: exhausted tries`);

      return questions;
    }));

    const studentSelector = {
      roles: 'student',
      'planProfile.plan': plan._id,
      'planProfile.getDaily': true,
    };

    test.set({
      questions: _.map(questions, '_id'),
      subjects: _.uniq(_.map(questions, 'subject')),
      tags: _.uniq(_.flatten(_.map(questions, 'tags'))),
      students: _.map(Meteor.users.find(studentSelector, { fields: { _id: true } }).fetch(), '_id'),
    });

    Check.Astro(test).valid();
    test.save();
  });
};

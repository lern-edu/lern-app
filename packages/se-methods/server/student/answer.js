const [prefix, protect] = ['Student', 'student'];

Helpers.Methods({ prefix, protect }, {
  AnswerStart(testId, questionId) {
    Check.Regex(testId, questionId).id();
    const { userId } = this;

    let test = Fetch.General.tests({ _id: testId, questions: questionId });
    Check.Cursor(test).some();
    test = _.first(test.fetch());

    let attempt = Fetch.User(userId).attempts({ test: testId, last: true, finished: null });
    Check.Cursor(attempt).some();
    attempt = _.first(attempt.fetch());

    let question = Fetch.General.questions(questionId);
    Check.Cursor(question).some();
    question = _.first(question.fetch());

    let answer = Fetch.General.answers({ question: questionId, attempt: attempt._id });
    Check.Cursor(answer).none();

    answer = new Answers.Schema({
      question: questionId,
      attempt: attempt._id,
      type: question.type, });
    if (test.timeoutType === 'question') answer.set('maxDuration', test.timeout);

    Check.Astro(answer).valid();
    answer.save();
    return answer;
  },

  PageAnswersStart(testId, index) {
    Check.Regex(testId).id();
    const { userId } = this;

    let test = Fetch.General.tests({ _id: testId });
    Check.Cursor(test).some();
    test = _.first(test.fetch());

    let attempt = Fetch.User(userId).attempts({ test: testId, last: true, finished: null });
    Check.Cursor(attempt).some();
    attempt = _.first(attempt.fetch());

    let questions = test.findPageQuestions(index);
    Check.Cursor(questions).some();

    let answers = Fetch.General.answers({ question: test.get('questions'), attempt: attempt._id });
    Check.Cursor(answer).none();

    const page = _.get(test.get('pages'), index);
    _.forEach(page, content => {
      if (content.question) {
        question = _.find(questions, content.question);

        const answer = new Answers.Schema({
          question: question._id,
          attempt: attempt._id,
          type: question.type, });
        if (test.timeoutType === 'page') answer.set('maxDuration', page.timeout);

        Check.Astro(answer).valid();
        answer.save();
      };
    });

    return attempt.findPageAnswers().fetch();
  },

  AnswerCognitiveStart(testId, questionsId) {
    Check.Regex(testId, ...questionsId).id();
    const { userId } = this;

    let test = Fetch.General.tests({ _id: testId });
    Check.Cursor(test).some();
    test = _.first(test.fetch());

    let attempt = Fetch.User(userId).attempts({ test: testId, last: true, finished: null });
    Check.Cursor(attempt).some();
    attempt = _.first(attempt.fetch());

    let questions = Fetch.General.questions(questionsId);
    Check.Cursor(questions).some();
    questions = questions.fetch();

    let answers = Answers.find({ question: { $in: questionsId }, attempt: attempt._id });
    answers = answers.fetch();

    if (!_.isEmpty(answers)) return answers;

    const answersToReturn = [];
    _.forEach(questions, ({ _id, type }) => {
      let answer = new Answers.Schema({ question: _id, attempt: attempt._id, type: type });
      if (test.timeoutType === 'question') answer.set('maxDuration', test.timeout);

      Check.Astro(answer).valid();
      answer.save();
      answersToReturn.push(answer);
    });

    return answersToReturn;
  },

  AnswerUpdate(answerId, value) {
    Check.Regex(answerId).id();
    const { userId } = this;

    let answer = Fetch.General.answers({ _id: answerId, finished: null, author: userId });
    Check.Cursor(answer).some();
    answer = _.first(answer.fetch());

    answer.set('answer', value);
    Check.Astro(answer).valid();
    answer.save();
    return answer;
  },

  AnswerFinish(answerId) {
    Check.Regex(answerId).id();
    const { userId } = this;

    let answer = Fetch.General.answers({ _id: answerId, finished: null, author: userId });
    Check.Cursor(answer).some();
    answer = _.first(answer.fetch());

    if (answer.type === 'closed') {
      let question = Fetch.General.questions(answer.question);
      Check.Cursor(question).some();
      question = _.first(question.fetch());
      const grade = +(question.answer === answer.answer);
      question.inc({ answerCount: 1, hitCount: grade });
      question.save();
      answer.set('grade', grade);
    }

    answer.set('finished', true);
    Check.Astro(answer).valid();
    answer.save();
    return answer;
  },

  AnswersFinish(answersId) {
    Check.Regex(...answersId).id();
    const { userId } = this;

    let answers = Fetch.General.answers(
      { _id: { $in: answersId }, finished: null, author: userId });
    answers = answers.fetch();

    _.forEach(answers, a => {
      a.set('finished', true);
      Check.Astro(a).valid();
      a.save();
    });

    return answers;
  },
});

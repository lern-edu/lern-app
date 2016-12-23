import React from 'react';

StudentTestAttemptView = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    const userId = Meteor.userId();
    const { testId, index = 0 } = this.props;

    const handles = {
      test: Meteor.subscribe('StudentTests', { testId }, {
        questions: true,
        subjects: true,
        tags: true,
      }),
      attempt: Meteor.subscribe('StudentAttempt', testId, {
        answers: true,
      }),
    };

    const data = {
      ready: _.mapValues(handles, h => h.ready()),
      attempt: _.first(Fetch.User(userId).attempts({
          test: testId, finished: null, last: true, }).fetch()),
      test: _.first(Fetch.General.tests(testId).fetch()),
    };

    data.questions = data.test && data.test.findQuestions().fetch();
    data.answers = data.attempt && data.attempt.findAnswers().fetch();

    _.forEach(data.questions, (q) => q.images = q.findAllImages().fetch());

    data.question = data.test && data.questions && _.find(data.questions,
      { _id: data.test.questions[index] });
    data.answer = data.test && data.question && data.attempt && _.find(data.answers,
      { question: data.question._id });

    return data;
  },

  render() {
    const { ready, test, question } = this.data;

    return (
      <div>

        <Layout.Bar
          title={_.get(test, 'name')} />

        {!_.every(ready) || !question ? <MUI.LinearProgress /> : [
          <StudentTestAttemptToolbar {...this.data} {...this.props} key='toolbar'/>,
          <StudentTestAttemptQuestion {...this.data} key={question._id} />,
        ]}

      </div>
    );
  },
});

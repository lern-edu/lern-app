import React from 'react';

StudentTestAttemptCognitiveView = React.createClass({
  mixins: [ReactMeteorData],

  getInitialState() {
    return { index: 1 };
  },

  getMeteorData() {
    const userId = Meteor.userId();
    const { testId } = this.props;
    const { index } = this.state;

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

    data.questionsGroup = data.test && data.questions && _.filter(data.questions,
      _.matches({ complement: { group: _.toString(index) } }));

    data.answersGroup = data.test && data.questionsGroup && data.attempt &&
      _.filter(data.answers, a =>_.includes(_.map(data.questionsGroup, '_id'), a.question));

    return data;
  },

  // handlers

  handleNext() {
    const { index } = this.state;
    this.setState({ index: index + 1 });
  },

  render() {
    const { ready, test, questionsGroup } = this.data;
    return (
      <div>

        <Layout.Bar
          title={_.get(test, 'name')} />

        {!_.every(ready) || _.isEmpty(questionsGroup) ? <MUI.LinearProgress /> : [
          <StudentTestAttemptCognitiveToolbar
            {...this.data}
            {...this.props}
            {...this.state}
            handleNext={this.handleNext}
            key='toolbar'/>,
          <StudentTestAttemptCognitiveQuestion {...this.data} key={_.first(questionsGroup)._id} />,
        ]}

      </div>
    );
  },
});

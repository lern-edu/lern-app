import React from 'react';

StudentTestAttemptCognitiveQuestion = React.createClass({

  /* Methods
  */

  startAnswer({ test, questionsGroup }) {
    Meteor.call('StudentAnswerCognitiveStart', test._id, _.map(questionsGroup, '_id'), err => {
      if (err) {
        console.log(err);
        snack(':(');
        FlowRouter.go('StudentHome');
      }
    });
  },

  /* Lifecycle
  */

  componentDidMount() {
    this.startAnswer(this.props);
  },

  /* Render
  */

  render() {
    const { test, questionsGroup, answersGroup } = this.props;

    return (
      <MUI.Paper className='container ui' style={{ paddingTop: '30px' }}>

        <StudentTestAttemptQuestionHeader key='header' {...this.props} />

      </MUI.Paper>
    );
  },
});

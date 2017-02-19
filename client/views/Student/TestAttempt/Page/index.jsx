import React from 'react';
import { Paper } from 'material-ui';

StudentTestAttemptPage = React.createClass({

  /* Methods
  */

  startAnswer({ test, question }) {
    Meteor.call('StudentAnswerStart', test._id, question._id, err => {
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
    const { answer } = this.props;
    if (!answer) this.startAnswer(this.props);
  },

  /* Render
  */

  render() {
    const { test, page, answer } = this.props;
    const state = !answer ? 'idle' : answer.finished ? 'done' : 'onit';

    return (
      <Paper className='container ui' style={{ paddingTop: '30px' }}>

        {state === 'idle' ? undefined : [
          <StudentTestAttemptQuestionHeader key='header' {...this.props} />,
          <StudentTestAttemptQuestionAnswer key='answer' {...this.props} />,
        ]}

      </Paper>
    );
  },
});

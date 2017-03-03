import React from 'react';
import { Paper, Divider } from 'material-ui';

import StudentTestAttemptPageToolbar from './Toolbar.jsx';
import StudentTestAttemptPageFooter from './Footer.jsx';

const StudentTestAttemptPage = React.createClass({

  // Initial state

  getInitialState() {
    const { attempt } = this.props;
    return {
      index: _.findIndex(attempt.get('timeTracked'), { finished: null }),
    };
  },

  /* Methods
  */

  startAnswers() {
    const { answers, questions, test, pages } = this.props;
    const { index } = this.state;

    if (pages.answers[index].length != pages.questions[index].length) {
      console.log('startAnswers');
      Meteor.call('StudentAnswersPageStart', test._id, index, err => {
        if (err) {
          console.log(err);
          snack(':(');
        } else this.startTimeout();
      });

    };
  },

  startTimeout() {
    console.log('startTimeout');
    const { attempt } = this.props;
    const { index } = this.state;
    Meteor.call('StudentAttemptStartTimeoutPage', attempt._id, (err, res) => {
      if (err) {
        console.log(err);
        snack(':(');
      };
    });
  },

  finishAnswers() {
    console.log('finishAnswers');
    const { test, answers, pages, attempt } = this.props;
    const { index } = this.state;

    const answersId = _.map(_.get(pages, `answers[${index}]`), '_id');

    Meteor.call('StudentAnswersFinish', answersId, (err, answers) => {
      if (err) {
        console.log(err);
        snack(':(');
      } else {
        if (index == pages.questions.length - 1)
          this.finishAttempt();
        else {
          console.log('finishAnswersElse');
          this.setState({ index: index + 1 });
          this.startAnswers();
        };
      };
    });
  },

  finishAttempt() {
    console.log('finishAttempt');
    const { test } = this.props;
    Meteor.call('StudentAttemptFinish', test._id, (err, attempt) => {
      if (err) {
        console.log(err);
        snack(':(');
      } else {
        FlowRouter.go('StudentAttempt', { testId: test._id, attemptId: attempt._id });
      };
    });
  },

  /* Lifecycle
  */

  componentWillMount() {
    this.startAnswers();
  },

  /* Render
  */

  render() {
    const { test, attempt } = this.props;
    const { index } = this.state;
    return (
      <div>

        <StudentTestAttemptPageToolbar index={index} {...this.props} parent={this} />

        <StudentTestAttemptPageContent index={index} {...this.props} parent={this} />

        <StudentTestAttemptPageFooter index={index} {...this.props} parent={this} />

      </div>
    );
  },
});

export default StudentTestAttemptPage;

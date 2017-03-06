import React from 'react';
import { Paper, Divider } from 'material-ui';

import StudentTestAttemptGlobalToolbar from './Toolbar.jsx';
import StudentTestAttemptGlobalContent from './Content/index.jsx';
import StudentTestAttemptGlobalFooter from './Footer.jsx';

const StudentTestAttemptGlobal = React.createClass({

  // Initial state

  getInitialState() {
    return { index: 0 };
  },

  /* Methods
  */

  startAnswers() {
    const { answers, questions, test, pages } = this.props;
    const { index } = this.state;

    if (answers.length != questions.length) {

      Meteor.call('StudentAnswersStart', test._id, err => {
        if (err) {
          console.error(err);
          snack(':(');
        };
      });

    };
  },

  finishAnswers() {
    const { test, answers, pages, attempt } = this.props;
    const { index } = this.state;

    const answersId = _.map(answers, '_id');

    Meteor.call('StudentAnswersFinish', _.map(answers, '_id'), err => {
      if (err) {
        console.error(err);
        snack(':(');
      } else this.finishAttempt();
    });
  },

  finishAttempt() {
    const { test } = this.props;
    Meteor.call('StudentAttemptFinish', test._id, (err, attempt) => {
      if (err) {
        console.error(err);
        snack(':(');
      } else
        FlowRouter.go('StudentAttempt', { testId: test._id, attemptId: attempt._id });
    });
  },

  /* Lifecycle
  */

  componentWillMount() {
    this.startAnswers();
  },

  // Handlers

  handleBack() {
    const { index } = this.state;
    this.setState({ index: index - 1 });
  },

  handleForward() {
    const { index } = this.state;
    const { pages, test } = this.props;

    if (index < pages.questions.length - 1)
      this.setState({ index: index + 1 });
    else this.finishAnswers();
  },

  /* Render
  */

  render() {
    const { test, attempt } = this.props;
    const { index } = this.state;
    return (
      <div>

        <StudentTestAttemptGlobalToolbar index={index} {...this.props} parent={this} />

        <StudentTestAttemptGlobalContent index={index} {...this.props} parent={this} />

        <StudentTestAttemptGlobalFooter index={index} {...this.props} parent={this} />

      </div>
    );
  },
});

export default StudentTestAttemptGlobal;

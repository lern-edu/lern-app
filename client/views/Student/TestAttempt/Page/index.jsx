import React from 'react';
import { Paper, Divider } from 'material-ui';

import StudentTestAttemptToolbar from './Toolbar.jsx';
import StudentTestAttemptFooter from './Footer.jsx';

StudentTestAttemptPage = React.createClass({

  // Initial state

  getInitialState() { return { index: 0 }; },

  /* Methods
  */

  startAnswers() {
    const { answers, questions, test, pages } = this.props;
    const { index } = this.state;

    console.log(pages.answers[index].length, pages.questions[index].length);
    console.log(answers.length, questions.length);

    if (test.timeoutType == 'global'
      ? answers.length != questions.length
      : pages.answers[index].length != pages.questions[index].length) {

      this.setStartTimeout();

      test.timeoutType == 'page'
      ? Meteor.call('StudentAnswersPageStart', test._id, index, err => {
        if (err) {
          console.log(err);
          snack(':(');
        };
      })
      : Meteor.call('StudentAnswersStart', test._id, err => {
        if (err) {
          console.log(err);
          snack(':(');

          // FlowRouter.go('StudentHome');
        }
      });

    };
  },

  setStartTimeout() {
    const { attempt } = this.props;
    const { index } = this.state;
    if (index === 0) {
      console.log(index);
      Meteor.call('StudentAttemptTime', attempt._id, (err, res) => {
        if (err) {
          console.log(err);
          snack(':(');
        } else console.log(res);
      });
    };
  },

  /* Lifecycle
  */

  componentDidMount() {
    this.startAnswers();
  },

  // Handlers

  // handleForward() {
  //   const { test, answers } = this.props;
  //   const { index } = this.state;
  //
  //   if (index < _.get(test, 'questions.length') - 1)
  //     this.setState({ index: index + 1 });
  //
  //   // when you answer all questions you can finish
  //   if (_.isEqual(_.get(test, 'questions.length'), answers.length)
  //     && _.every(_.pullAllBy(answers, [{ _id: answer._id }], '_id'), 'finished'))
  //     this.finishAttempt();
  // },
  //
  // handleBack() {
  //   const { test } = this.props;
  //   const { index } = this.state;
  //   if (index) this.setState({ index: index - 1 });
  // },
  //
  // handleAnswer() {
  //   const { answer, answers } = this.props;
  //   Meteor.call('StudentAnswerFinish', answer._id, err => {
  //     if (err) {
  //       console.log(err);
  //       if (!_.isEmpty(_.get(err, 'reason.answer')))
  //         snack('Marque alguma alternativa');
  //       else snack(':(');
  //     } else this.handleForward();
  //   });
  // },

  /* Render
  */

  render() {
    const { test, attempt } = this.props;
    const { index } = this.state;
    return (
      <div>

        <StudentTestAttemptToolbar index={index} {...this.props} parent={this} />
        <div className='ui grid' style={{ paddingBottom: 66 }}>
          {_.map(_.get(test, `pages[${index}].content`), (c, i) =>
            <div className='row' key={i}>
              <div className='sixteen wide column'>
                <StudentTestAttemptPageContent
                  field='content'
                  schema={Tests.PageContentSchema}
                  scored={test.scored}
                  doc={c}
                  {...this.props} />
                <Divider/>
              </div>
            </div>
          )}
        </div>
        <StudentTestAttemptFooter index={index} {...this.props} parent={this} />

      </div>
    );
  },
});

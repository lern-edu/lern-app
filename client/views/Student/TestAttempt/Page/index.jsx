import React from 'react';
import { Paper, Divider } from 'material-ui';

import StudentTestAttemptToolbar from './Toolbar.jsx';
import StudentTestAttemptFooter from './Footer.jsx';

StudentTestAttemptPage = React.createClass({

  // Initial state

  getInitialState() { return { index: 0 }; },

  /* Methods
  */

  startAnswer({ test }) {
    Meteor.call('StudentPageAnswersStart', test._id, this.state.index, err => {
      if (err) {
        console.log(err);
        snack(':(');

        // FlowRouter.go('StudentHome');
      }
    });
  },

  /* Lifecycle
  */

  componentDidMount() {
    const { answers, test } = this.props;
    const { index } = this.state;

    const questionsPage = _.compact(_.map(_.get(test, `page.[${index}].content`), 'question'));
    const questionAnswers = _.filter(_.map(answers, 'question'),
      question => _.includes(questionsPage, question));

    if (questionAnswers.length < questionsPage.length || _.isEmpty(answers))
      this.startAnswer(this.props);
  },

  /* Render
  */

  render() {
    const { test } = this.props;

    console.log(this.props);

    return (
      <div>

        <StudentTestAttemptToolbar {...this.props} />,

        {/* {_.map(content, (c, i) =>
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
        )} */}

        {/* <StudentTestAttemptFooter {...this.props} key='footer' />, */}
      </div>
    );
  },
});

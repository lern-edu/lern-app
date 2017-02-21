import React from 'react';
import { Paper, Divider, Editor } from 'material-ui';

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
    const { test, page, page: { content } } = this.props;

    console.log('132456');
    console.log(this);

    return (

      /*<Paper className='container ui' style={{ paddingTop: '30px' }}>

        {state === 'idle' ? undefined : [
          <StudentTestAttemptPageHeader key='header' {...this.props} />,
          <StudentTestAttemptPageAnswer key='answer' {...this.props} />,
        ]}

      </Paper>*/
      <div>
        {_.map(content, (c, i) =>
          /*<StudentTestAttemptQuestion key={c} content={c} {...this.props} />*/
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
    );
  },
});

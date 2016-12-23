import React from 'react';
import { FloatingActionButton, FontIcon } from 'material-ui';

TeacherQuestionsToolbar = React.createClass({
  render() {
    return (
      <div
      className='ui right aligned basic segment'
      style={{ position: 'fixed', bottom: '1em', right: '1em' }}>
        <FloatingActionButton
          
          href={FlowRouter.path('TeacherQuestionCreate')}
          labelPosition='after'
          children={<FontIcon className='material-icons'>add</FontIcon>}
        />
      </div>
    );
  },
});

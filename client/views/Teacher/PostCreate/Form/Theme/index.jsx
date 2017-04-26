// Libs
import React from 'react';
import { RaisedButton, TextField, MenuItem } from 'material-ui';

// View
import TeacherPostCreateFormThemeSubjects from './Subjects.jsx';
import TeacherPostCreateFormThemeTags from './Tags.jsx';

const TeacherPostCreateFormThemeView = React.createClass({

  /* Render
  */

  render() {
    const { form, done, errors } = this.props;

    return (
      <div className='ui basic segment' style={{ marginLeft: '5px' }} >
        <div className='ui grid'>

          <div className='row'>
            <TeacherPostCreateFormThemeSubjects {...this.props} />
          </div>

          <div className='row'>
            <TeacherPostCreateFormThemeTags {...this.props} />
          </div>

          <div className='row'>
            <RaisedButton
              label='Voltar'
              secondary={true}
              style={{ marginRight: 5 }}
              onTouchTap={form.prevStep}
            />
            <RaisedButton
              label='Terminar'
              disabled={!done}
              primary={true}
              onTouchTap={form.handleSubmit}
            />
          </div>

        </div>
      </div>
    );
  },
});

export default TeacherPostCreateFormThemeView;

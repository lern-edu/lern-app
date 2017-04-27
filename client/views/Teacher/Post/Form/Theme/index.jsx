// Libs
import React from 'react';
import { RaisedButton, TextField, MenuItem } from 'material-ui';

// View
import TeacherPostFormThemeSubjects from './Subjects.jsx';
import TeacherPostFormThemeTags from './Tags.jsx';

const TeacherPostFormThemeView = React.createClass({

  /* Render
  */

  render() {
    const { form, done, errors } = this.props;

    return (
      <div className='ui basic segment' style={{ marginLeft: '5px' }} >
        <div className='ui grid'>

          <div className='row'>
            <TeacherPostFormThemeSubjects {...this.props} />
          </div>

          <div className='row'>
            <TeacherPostFormThemeTags {...this.props} />
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

export default TeacherPostFormThemeView;

// Libs
import React from 'react';
import { RaisedButton, TextField, MenuItem } from 'material-ui';

// View
import StudentPostCreateFormThemeSubjects from './Subjects.jsx';
import StudentPostCreateFormThemeTags from './Tags.jsx';

const StudentPostCreateFormThemeView = React.createClass({

  /* Render
  */

  render() {
    const { form, done, errors } = this.props;

    return (
      <div className='ui basic segment' style={{ marginLeft: '5px' }} >
        <div className='ui grid'>

          <div className='row'>
            <StudentPostCreateFormThemeSubjects {...this.props} />
          </div>

          <div className='row'>
            <StudentPostCreateFormThemeTags {...this.props} />
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

export default StudentPostCreateFormThemeView;

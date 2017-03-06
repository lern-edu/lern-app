// Libs
import React from 'react';
import { RaisedButton, TextField, MenuItem } from 'material-ui';

// View
import AdminTestFormThemeSubjects from './Subjects.jsx';
import AdminTestFormThemeTags from './Tags.jsx';

const AdminTestFormThemeView = React.createClass({

  /* Render
  */

  render() {
    const { form, done, errors } = this.props;

    return (
      <div className='ui basic segment' style={{ marginLeft: '5px' }} >
        <div className='ui grid'>

          <div className='row'>
            <AdminTestFormThemeSubjects {...this.props} />
          </div>

          <div className='row'>
            <AdminTestFormThemeTags {...this.props} />
          </div>

          <div className='row'>
            <RaisedButton
              label='Voltar'
              secondary={true}
              style={{ marginRight: 5 }}
              onTouchTap={form.prevStep} />
            <RaisedButton
              label='Próximo'
              disabled={!done}
              primary={true}
              onTouchTap={form.nextStep} />
          </div>

        </div>
      </div>
    );
  },
});

export default AdminTestFormThemeView;

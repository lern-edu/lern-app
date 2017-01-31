// Libs
import React from 'react';
import { RaisedButton, TextField, MenuItem } from 'material-ui';

// View
import AdminTestCreateFormPageCreate from './Create.jsx';
import AdminTestCreateFormPageShow from './Show.jsx';

const AdminTestCreateFormPage = React.createClass({

  /* Render
  */

  render() {
    const { form, done, subjects, scored } = this.props;
    const questionsSelected = _.flatten(_.map(form.doc.get('pages'), p =>
      _.compact(_.map(p.get('content'), 'question'))));

    console.log(form.doc.get('pages'));

    return (
      <div className='ui basic segment' style={{ marginLeft: '5px' }} >
        <div className='ui grid'>

          <div className='row'>
            <div className='sixteen wide column'>
              <AdminTestCreateFormPageCreate
                scored={scored}
                questionsSelected={questionsSelected}
                form={form}
                subjects={subjects} />
            </div>
          </div>

          <div className='row'>
            {_.map(form.doc.get('pages'), (c, i) =>
              <div className='sixteen wide column' key={i}>
                <AdminTestCreateFormPageShow
                  index={i}
                  form={form}
                  doc={c} />
              </div>)}
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

export default AdminTestCreateFormPage;

// Libs
import React from 'react';
import { RaisedButton, TextField, MenuItem } from 'material-ui';

// View
import AdminTestCreateFormBasicContent from './Content.jsx';
import AdminTestCreateFormBasicContentShow from './ContentShow.jsx';

const AdminTestCreateFormBasic = React.createClass({

  // Handlers

  handleInput({ currentTarget, target: { value } }) {
    this.props.form.defaultHandler({
      [currentTarget.getAttribute('name')]: value,
    }, { doc: true });
  },

  /* Render
  */

  render() {
    const { form, done } = this.props;

    return (
      <div className='ui basic segment' style={{ marginLeft: '5px' }} >
        <div className='ui grid'>

          <div className='row'>
            <TextField
              value={form.doc.get('name') || ''}
              floatingLabelText='Nome'
              name='name'
              errorText={_.get(form.state.errors, 'name')}
              onInput={this.handleInput}  />
          </div>

          <div className='row'>
            <div className='sixteen wide column'>
              <AdminTestCreateFormBasicContent form={form} />
            </div>
          </div>

          <div className='row'>
            {_.map(form.doc.get('info'), (s, i) =>
              <div className='sixteen wide column' key={i} >
                <AdminTestCreateFormBasicContentShow
                  index={i}
                  form={form}
                  info={s} />
            </div>)}
          </div>

          <div className='row'>
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

export default AdminTestCreateFormBasic;

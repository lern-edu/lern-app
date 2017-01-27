import React from 'react';
import { RaisedButton, TextField, DropDownMenu, MenuItem } from 'material-ui';

const AdminUserCreateFormBasic = React.createClass({

  // Handlers

  handleInput({ currentTarget, target: { value } }) {
    this.props.form.defaultHandler({ [currentTarget.getAttribute('name')]: value }, { doc: true });
  },

  handleRoleChange(event, index, role) {
    this.props.form.defaultHandler({ role }, { doc: true });
  },

  /* Render
  */

  render() {
    const { form } = this.props;

    const done = !_.some(['email', 'name', 'role'],
      k => _.get(form, `state.errors[${k}]`));
    const role = _.get(form, 'doc.role') || 'student';

    return (
      <div className='ui centered grid'>

        <div className='row'>
          <TextField
            value={form.doc.get('email') || ''}
            floatingLabelText='Email'
            name='email'
            errorText={_.get(form.state.errors, 'email')}
            onInput={this.handleInput} />
        </div>

        <div className='row'>
          <TextField
            value={form.doc.get('name') || ''}
            floatingLabelText='Nome'
            name='name'
            errorText={_.get(form.state.errors, 'name')}
            onInput={this.handleInput}  />
        </div>

        <div className='row'>
          <DropDownMenu value={role} onChange={this.handleRoleChange}>
            {_.map(UserRoles.all('both'), (v, k) => <MenuItem value={k} key={k} primaryText={v} />)}
          </DropDownMenu>
        </div>

        <div className='row'>
          <RaisedButton
            label='Próximo'
            disabled={!done}
            primary={true}
            onTouchTap={form.nextStep} />
        </div>

      </div>
    );
  },
});

export default AdminUserCreateFormBasic;

import React from 'react';
import { Paper, SelectField, MenuItem, TextField, FlatButton } from 'material-ui';

AdminUserName = React.createClass({

  // Initial state

  getInitialState() {
    return { name: _.get(this, 'props.user.profile.name') };
  },

  // Handlers

  handleNameChange({ target: { value: name } }) {
    this.setState({ name });
  },

  handleSaveChanges() {
    const { name } = this.state;
    const { _id: userId } = this.props;
    if (_.get(name, 'length') < 4)
      snack('Digite seu nome completo');
    else
      Meteor.call('AdminUpdateProfileName', { name, userId }, err => {
        if (!err) snack('Nome atualizado!');
        else console.log(err);
      });
  },

  // Render

  render() {
    const { state: { name } } = this;
    return (
      <Paper className='ui basic segment'>

          <div className='ui vertical basic segment'>
            <TextField
              onChange={this.handleNameChange}
              fullWidth={true}
              floatingLabelText='Nome Completo'
              value={name} />
          </div>

          <div className='ui right aligned basic segment'>
            <FlatButton
              label='Salvar'
              primary={true}
              onTouchTap={this.handleSaveChanges}/>
          </div>

      </Paper>
    );
  },
});

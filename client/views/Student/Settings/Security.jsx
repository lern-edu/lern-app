import React from 'react';
import { Paper, TextField, RaisedButton } from 'material-ui';

StudentSettingsSecurity = React.createClass({
  /* Lifecycle
  */

  getInitialState() {
    return { current: undefined, target: undefined };
  },

  /* Handlers
  */

  handleInputChange({ target }) {
    const { value, name } = target;
    this.setState({ [name]: value });
  },

  handleSubmit() {
    const { current, target } = this.state;
    Accounts.changePassword(current, target, err => {
      if (err) {
        console.log(err);
        snack('Erro inesperado', 'orange warning');
      } else {
        this.setState({ current: undefined, target: undefined });
        snack('Senha trocada', 'green checkmark');
      }
    });
  },

  /* Render
  */

  render() {
    const { target, current } = this.state;

    return (
      <Paper className='ui basic center aligned segment'>
        <div className='ui header'>Senha</div>
        <div>
          <TextField
            value={current}
            hintText='Senha atual'
            type='password'
            onChange={this.handleInputChange}
            name='current'
          />
        </div>
        <div>
          <TextField
            value={target}
            hintText='Nova senha'
            type='password'
            onChange={this.handleInputChange}
            name='target'
          />
        </div>
        <div>
          <RaisedButton
            disabled={!(target && current)}
            label='Trocar'
            primary={true}
            onClick={this.handleSubmit}
          />
        </div>
      </Paper>
    );
  },
});

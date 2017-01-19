import React from 'react';
import { RaisedButton, Dialog, TextField } from 'material-ui';

PublicEnrollmentView = React.createClass({
  /* Lifecycle
  */

  getInitialState() {
    return { password: undefined };
  },

  /* Handlers
  */

  handleInput(event) {
    const password = $(event.target).val();
    this.setState({ password });
  },

  handleSubmit() {
    const { token } = this.props;
    const { password } = this.state;
    Accounts.resetPassword(token, password, err => {
      if (err) console.log(err);
      else FlowRouter.go('PublicHome');
    });
  },

  handlePressEnter(event) {
    if (event.keyCode == 13) this.handleSubmit();
  },

  /* Render
  */

  render() {
    const { password } = this.state;
    const actions = [
      <div className= 'ui center aligned container'>
        <TextField
          type='password'
          hintText='Mínimo 6 caracteres'
          value={password}
          onInput={this.handleInput}
          onKeyDown={this.handlePressEnter}/>
        <br/>
        <RaisedButton
          label='Salvar'
          primary={true}
          onClick={this.handleSubmit}
          disabled={!(password && password.length >= 6)}
          style= {{ margin: '30px' }}/>
        </div>,
    ];
    return (
      <div className='ui container'>
        <Layout.Bar
          title='Cadastro'
        />

        <Dialog
          title='Escolha sua senha'
          open={true}
          actions={actions}/>
      </div>
    );
  },
});

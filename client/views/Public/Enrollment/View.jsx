import React from 'react';

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

  /* Render
  */

  render() {
    const { password } = this.state;

    return (
      <div className='ui container'>
        <Layout.Bar
          title='Cadastro'
        />

        <MUI.Dialog
          title='Escolha sua senha'
          open={true}
          actions={[
            <MUI.FlatButton
              label='Salvar'
              keyboardFocused={true}
              primary={true}
              disabled={!(password && password.length >= 6)}
              onClick={this.handleSubmit}
            />,
          ]}
        >
          <MUI.TextField
            type='password'
            hintText='Mínimo 6 caracteres'
            value={password}
            onChange={this.handleInput}
          />
        </MUI.Dialog>
      </div>
    );
  },
});

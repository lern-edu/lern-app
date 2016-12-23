import React from 'react';
import { Paper, TextField, RaisedButton, Divider } from 'material-ui';

PublicLoginView = React.createClass({

  /* Get Context
  */

  contextTypes: {
    user: React.PropTypes.object,
  },

  /* Lifecycle
  */

  getInitialState() {
    return { password: '', username: '', open: false, verify: false };
  },

  /* Methods
  */

  clear() {
    this.setState({ password: '', username: '' });
  },

  /* Handlers
  */

  handleInput(event) {
    const value = $(event.target).val();
    const name = $(event.target).attr('name');
    this.setState({ [name]: value });
  },

  handleSubmit(event) {
    const { username, password } = this.state;
    if (username && password) {
      Meteor.loginWithPassword(username, password, err => {
        if (err) {
          snack(err.reason.includes('password') ? 'Senha incorreta' :
          'Usuário não encontrado');
          this.clear();
        } else {
          FlowRouter.go(Meteor.user().getHomeRoute());
          snack('Bem vindo!');
        };
      });
    } else snack('Preencha todos os campos');
  },

  handlePressEnter(event) {
    if (event.keyCode == 13) this.handleSubmit();
  },

  handlePasswordChange() {
    const { open } = this.state;
    this.setState({ open: !open });
  },

  handleFacebookLogin() {
    Meteor.loginWithFacebook({}, (err) => {
      if (err) snack('Problemas ao cadastrar');
      else {
        snack('Bem vindo!');
        const user = Meteor.user();
        console.log(Meteor.userId());
        if (_.get(user, 'profile.tutorial'))
          FlowRouter.go('StudentSettings', {}, { tab: 'course' });
        else FlowRouter.go(user.getHomeRoute());
      };
    });
  },

  handleGoogleLogin() {
    Meteor.loginWithGoogle({}, (err) => {
      if (err) snack('Problemas ao cadastrar');
      else {
        snack('Bem vindo!');
        const user = Meteor.user();
        console.log(Meteor.userId());
        if (_.get(user, 'profile.tutorial'))
          FlowRouter.go('StudentSettings', {}, { tab: 'course' });
        else FlowRouter.go(user.getHomeRoute());
      };
    });
  },

  /* Render
  */

  render() {
    const { password, username, open, verify } = this.state;
    return (
      <div>

        <Layout.Bar title='Bem vindo' />

        <div className='ui centered grid'>
          <div className='six wide computer sixteen wide tablet column'>
            <Paper className='ui basic center aligned segment' style={{ marginTop: '15px' }}>
              <div className='ui header'>Lern - Soluções Educacionais</div>
                <div className='row'>
                  <p><strong>Entre ou cadastre através de</strong></p>
                  <button className='ui facebook button' onClick={this.handleFacebookLogin} >
                    <i className='facebook icon' />Facebook
                  </button>
                  <button className='ui google plus button' onClick={this.handleGoogleLogin} >
                    <i className='google icon' />Google
                  </button>
                </div>
                <p/>
                <Divider />
                <p/>
                <div className='row'>Ou entre</div>
                <div className='row'>
                  <p/>
                  <TextField
                    floatingLabelText='E-mail'
                    value={username}
                    name='username'
                    onInput={this.handleInput}
                    onKeyDown={this.handlePressEnter} />
                </div>
                <div className='row'>
                <TextField
                  floatingLabelText='Senha'
                  value={password}
                  type='password'
                  name='password'
                  onInput={this.handleInput}
                  onKeyDown={this.handlePressEnter} />
                </div>
                <div style={{ cursor: 'pointer',
                  color: 'blue',
                  marginTop: '20px', }}
                  onTouchTap={this.handlePasswordChange}>
                  Esqueceu sua senha?
                </div>
              <div style={{ marginTop: '15px' }}>
                <RaisedButton
                  label='Entrar'
                  primary={true}
                  onClick={this.handleSubmit} />
              </div>
            </Paper>
            <PublicHomeForgotPassword open={open} handleClose={this.handlePasswordChange} />
            <PublicHomeRegister verify={verify} handleClose={this.handleSendVerification} />
          </div>
        </div>

      </div>
    );
  },
});

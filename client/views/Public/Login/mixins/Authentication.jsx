import React from 'react';

const PublicLoginAuthentication = {

  /* Lifecycle
  */

  getInitialState() {
    return { password: '', email: '', verify: false };
  },

  /* Methods
  */

  clear() {
    this.setState({ password: '', email: '' });
  },

  /* Handlers
  */

  handleInput({ currentTarget, target: { value } }) {
    const name = currentTarget.getAttribute('name');
    this.setState({ [name]: value });
  },

  handlePressEnter(event) {
    if (event.keyCode == 13) this.handleLogin();
  },

  handleLogin(event) {
    const { email, password } = this.state;
    if (email && password) {
      Meteor.loginWithPassword(email, password, err => {
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

  handleFacebookLogin() {
    Meteor.loginWithFacebook({
      requestPermissions: ['public_profile', 'email'],
    }, (err) => {
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

};

export default PublicLoginAuthentication;

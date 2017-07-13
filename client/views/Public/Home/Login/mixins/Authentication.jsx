import React from 'react';

PublicHomeAuthentication = (WrappedCompenent) => class View extends React.Component {

  // Lifecycle

  constructor(props) {
    super(props);
    this.state = { password: '', email: '', verify: false };
  }

  /* Methods
  */

  clear() {
    this.setState({ password: '', email: '' });
  }

  /* Handlers
  */

  handleInput({ currentTarget, target: { value } }) {
    const name = currentTarget.getAttribute('name');
    this.setState({ [name]: value });
  }

  handlePressEnter(event) {
    if (event.keyCode == 13) this.handleLogin();
  }

  handleLogin(event) {
    const { email, password } = this.state;
    if (email && password) {
      Meteor.loginWithPassword(email, password, err => {
        if (err) {
          snack(err.reason.includes('password') ? 'Senha incorreta' :
          'Usuário não encontrado');
          this.clear();
        } else this.handleRedirect();
      });
    } else snack('Preencha todos os campos');
  }

  handleFacebookLogin() {
    Meteor.loginWithFacebook({ requestPermissions: ['public_profile', 'email'] },
    (err) => {
      if (err) snack('Problemas ao cadastrar');
      else this.handleRedirect();
    });
  }

  handleGoogleLogin() {
    Meteor.loginWithGoogle({}, (err) => {
      if (err) snack('Problemas ao cadastrar');
      else this.handleRedirect();
    });
  }

  handleRedirect() {
    snack('Bem vindo!');
    const user = Meteor.user();
    console.log(Meteor.userId());
    if (_.get(this, 'props.query.alias'))
      FlowRouter.go(user.getSetupRoute(), {}, { ...this.props.query });
    else FlowRouter.go(user.getHomeRoute(), {}, { ...this.props.query });
  }

  render() {
    return <WrappedCompenent authentication={this} {...this.props} />;
  }

};

export default PublicHomeAuthentication;

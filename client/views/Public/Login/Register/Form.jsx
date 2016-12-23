import React from 'react';

PublicHomeRegisterForm = React.createClass({
  mixins: [AstroForm(Meteor.users.FormSchema, 'AdminUserCreate')],

  // Initial State

  getInitialState() {
    return { email: '', valid: true };
  },

  // Handlers

  handleChange({ target: { value }, currentTarget }, id) {
    this.setState({ [currentTarget.getAttribute('data-key')]: value });
    this.setState({ valid: this.emailValidator() });
  },

  handleSubmit() {
    const { props: { handleClose }, state: { email, valid } } = this;
    if (!this.emailValidator()) {
      snack('Digite um email válido');
      return;
    };

    Accounts.forgotPassword({ email }, (err) => {
      if (!err) {
        snack('Vá até o link de verificação em seu email');
      } else {
        if (err.reason.includes('not found'))
          snack('Não encontramos o email especificado');
        else snack('Erro! Entre em contato com nossa equipe');
      };

      handleClose();
    });
  },

  // Validator

  emailValidator() {
    const { email } = this.state;
    const filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return filter.test(email);
  },

  // render

  render() {

    return (
      <TextField
        hintText='Nome completo'
        data-key='name'
        errorText={valid ? undefined : 'Digite um email válido'}
        floatingLabelText='Email'
        onInput={this.handleChange} />
    );
  },

});

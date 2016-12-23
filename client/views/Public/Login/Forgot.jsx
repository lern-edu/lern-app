import React from 'react';
import { Dialog, FlatButton, TextField } from 'material-ui';

PublicHomeForgotPassword = React.createClass({

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

  // Render

  render() {
    const { open, handleClose } = this.props;
    const { valid } = this.state;
    return (
      <Dialog
        title='Redefinir senha'
        open={open}
        modal={true}
        actions={[
          <FlatButton
            label='Enviar'
            primary={true}
            disabled={!valid}
            onTouchTap={this.handleSubmit} />,
          <FlatButton
            label='Cancelar'
            onTouchTap={handleClose} />,
        ]}
        onRequestClose={handleClose} >
        <div className='row'>
          <p>Nos diga seu email para enviar uma mensagem de redefinição de senha.</p>
        </div>
        <div className='row'>
          <TextField
            hintText='Email'
            data-key='email'
            errorText={valid ? undefined : 'Digite um email válido'}
            floatingLabelText='Email'
            onInput={this.handleChange} />
        </div>
      </Dialog>
    );
  },
});

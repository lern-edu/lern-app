import React from 'react';
import { TextField, Dialog, FlatButton } from 'material-ui';;

PublicHomeEmail = React.createClass({

  // Initial State

  getInitialState() {
    return { email: '', text: '', valid: true };
  },

  // Handlers

  handleChange({ target: { value }, currentTarget }, id) {
    this.setState({ [currentTarget.getAttribute('data-key')]: value });
    this.setState({ valid: this.emailValidator() });
  },

  handleSubmit() {
    const { email, text, valid } = this.state;
    if (!this.emailValidator()) {
      snack('Digite um email válido');
      return;
    };

    Meteor.call('PublicSendEmail', { email, text }, (err) => {
      if (err) console.log(err);
      else {
        snack('Obrigado!');
        this.setState({ email: '', text: '' });
        this.props.handleEmail();
      };
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
    const { handleEmail, open } = this.props;
    const { email, text, valid } = this.state;

    return (
      <Dialog
        title='Fale conosco'
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
            onTouchTap={handleEmail} />,
        ]}
        onRequestClose={handleEmail} >
        <div className='row'>
          <TextField
            hintText='Email'
            data-key='email'
            fullWidth={true}
            errorText={valid ? undefined : 'Digite um email válido'}
            floatingLabelText='Email'
            onInput={this.handleChange} />
        </div>
        <div className='row'>
          <TextField
            hintText='Mensagem'
            data-key='text'
            fullWidth={true}
            floatingLabelText='Mensagem'
            multiLine={true}
            rows={7}
            onInput={this.handleChange} />
        </div>
      </Dialog>
    );
  },

});

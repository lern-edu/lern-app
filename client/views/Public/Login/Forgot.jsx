import React from 'react';
import i18n from 'meteor/universe:i18n';
import { Dialog, FlatButton, TextField } from 'material-ui';

const texts = {
  forgotPasswordEmailNotFound: i18n.__('PublicLoginForgot.forgotPasswordEmailNotFound'),
  forgotPasswordSuccess: i18n.__('PublicLoginForgot.forgotPasswordSuccess'),
  forgotPasswordSuccess: i18n.__('PublicLoginForgot.forgotPasswordSuccess'),
  TextFieldEmailLabel: i18n.__('PublicLoginForgot.TextFieldEmailLabel'),
  TextFieldEmailError: i18n.__('PublicLoginForgot.TextFieldEmailError'),
  CancelButton: i18n.__('PublicLoginForgot.CancelButton'),
  DialogTitle: i18n.__('PublicLoginForgot.DialogTitle'),
  SendButton: i18n.__('PublicLoginForgot.SendButton'),
  DialogText: i18n.__('PublicLoginForgot.DialogText'),
};

const PublicLoginForgot = React.createClass({
  getInitialState() {
    return { email: '' };
  },

  handleChange({ target: { value }, currentTarget }, id) {
    this.setState({ [currentTarget.getAttribute('data-key')]: value });
  },

  handleSubmit() {
    const { props: { handleClose }, state: { email } } = this;

    Accounts.forgotPassword({ email }, (err) => {
      if (!err) {
        snack(texts.forgotPasswordSuccess);
      } else {
        if (err.reason.includes('not found'))
          snack(texts.forgotPasswordEmailNotFound);
        else snack(texts.forgotPasswordSuccess);
      };

      handleClose();
    });
  },

  render() {
    const { open, handleClose } = this.props;
    const { email } = this.state;

    return (
      <Dialog
        title={texts.DialogTitle}
        open={open}
        modal={true}
        actions={[
          <FlatButton
            label={texts.SendButton}
            primary={true}
            disabled={!Regex.mail.test(email)}
            onTouchTap={this.handleSubmit} />,
          <FlatButton
            label={texts.CancelButton}
            onTouchTap={handleClose} />,
        ]}
        onRequestClose={handleClose} >
        <div className='row'>
          <p>{texts.DialogText}</p>
        </div>
        <div className='row'>
          <TextField
            hintText={texts.TextFieldEmailLabel}
            data-key='email'
            errorText={Regex.mail.test(email) ? undefined
              : texts.TextFieldEmailError}
            floatingLabelText={texts.TextFieldEmailLabel}
            onInput={this.handleChange} />
        </div>
      </Dialog>
    );
  },
});

export default PublicLoginForgot;

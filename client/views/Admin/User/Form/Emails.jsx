import React from 'react';
import { TextField, MenuItem, Paper, List, ListItem, FontIcon, RaisedButton, FlatButton, } from 'material-ui';

AdminUserEmails = React.createClass({

  // Initial State

  getInitialState() {
    return { email: '', valid: false };
  },

  // Handlers

  handleChange({ target: { value }, currentTarget }, id) {
    this.setState({ [currentTarget.getAttribute('data-key')]: value });
    this.setState({ valid: this.emailValidator() });
  },

  handleAddEmail() {
    const { props: { user: { _id } }, state: { email } } = this;
    Meteor.call('AdminUserAddEmail', _id, email, (err) => {
      if (err.reason.includes('already exists')) snack('Email já cadastrado!');
      else if (err) snack('Erro!');
      else snack('Email adicionado! Não se esqueça de enviar email de confirmação.');
      this.setState({ email: '', valid: false });
    });
  },

  handleVerifyEmailPassword({ currentTarget }) {
    const { props: { user: { _id } } } = this;
    Meteor.call('AdminUserSendEnrollmentEmail', _id, currentTarget.getAttribute('data-email'), (err) => {
      if (err) snack('Erro!');
      else snack('Email de confirmação enviado!');
    });
  },

  handleResetPassword({ currentTarget }) {
    Accounts.forgotPassword({ email: currentTarget.getAttribute('data-email') }, (err) => {
      if (!err) {
        snack('Vá até o link de verificação em seu email');
      } else {
        if (err.reason.includes('not found'))
          snack('Não encontramos o email especificado');
        else snack('Erro! Entre em contato com nossa equipe');
      };
    });
  },

  handleVerifyEmail({ currentTarget }) {
    const { props: { user: { _id } } } = this;
    Meteor.call('AdminUserSendVerificationEmail', _id,
      currentTarget.getAttribute('data-email'), (err) => {
        if (err) snack('Erro!');
        else snack('Email de confirmação enviado.');
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
    const { props: { user: { emails }={} }, state: { valid } } = this;
    return (
      <div className='ui basic segment'>

        <div className='row'>
          <div className='ui vertical basic segment'>
            <TextField
              hintText='Email'
              data-key='email'
              errorText={valid ? undefined : 'Digite um email válido'}
              floatingLabelText='Email'
              onInput={this.handleChange} />
          </div>
          <div className='ui right aligned basic segment'>
            <FlatButton
              label='Adicionar'
              disabled={valid ? false : true}
              primary={true}
              onTouchTap={this.handleAddEmail} />
          </div>
          {emails && emails.length ?
            (<div className='ui vertical basic segment'>
              <Paper zDepth={1}>
                <List>
                  {_.map(emails, ({ address, verified }) =>
                    <ListItem
                      key={address}
                      primaryText={address}
                      secondaryText={`${verified ? 'V' : 'Não v'}erificado`}
                      nestedItems={[
                        <ListItem
                          key='password'
                          primaryText='Reenviar email de senha'
                          leftIcon={<FontIcon
                            data-email={address}
                            onTouchTap={verified ? this.handleResetPassword :
                              this.handleVerifyEmailPassword}
                            className='material-icons'>
                            verified_user</FontIcon>}
                        />,
                        <ListItem
                          key='remove'
                          primaryText='Remover'
                          disabled={true}
                          leftIcon={<FontIcon
                            className='material-icons'>
                            delete</FontIcon>}
                        />, verified ? undefined :
                        <ListItem
                          key='verify'
                          primaryText='Verificar email'
                          leftIcon={<FontIcon
                            data-email={address}
                            onTouchTap={this.handleVerifyEmail}
                            className='material-icons'>
                            email</FontIcon>}
                        />,
                      ]}
                      leftIcon={<FontIcon
                        className='material-icons'>
                        email</FontIcon>}
                      initiallyOpen={false} />
                  )}
                </List>
              </Paper>
            </div>) : undefined}
        </div>

      </div>
    );
  },
});

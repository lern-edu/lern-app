import React from 'react';
import { TextField, MenuItem, Paper, List } from 'material-ui';
import { ListItem, FontIcon, Divider, FlatButton } from 'material-ui';

const StudentSetupFormUserEmails = React.createClass({

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
    const { props: { form: { doc } }, state: { email } } = this;
    Meteor.call('StudentAddEmail', doc.get('_id'), email, (err) => {
      if (err && err.reason.includes('already exists')) snack('Email já cadastrado!');
      else if (err) snack('Erro!');
      else {
        snack('Email adicionado! Um email de confirmação será encaminhado!');
        Meteor.call('StudentSendVerificationEmail', doc.get('_id'), email, (err) => {
          if (err) snack('Erro!');
        });
      };

      this.setState({ email: '', valid: false });
    });
  },

  handleVerifyEmail({ currentTarget }) {
    const { props: { form: { doc } } } = this;
    Meteor.call('StudentSendVerificationEmail', doc.get('_id'),
      currentTarget.getAttribute('data-email'), (err) => {
        if (err) snack('Erro!');
        else snack('Email de confirmação enviado. Verifique seu email!');
      });
  },

  // Validator

  emailValidator() {
    const { email } = this.state;
    return Match.Regex(email).mail();
  },

  // Render

  render() {
    const { props: { emails, form }, state: { valid } } = this;
    return (
      <div>

        <div className='row'>
          <TextField
            hintText='Email'
            data-key='email'
            errorText={valid ? undefined : 'Digite um email válido'}
            floatingLabelText='Email'
            onInput={this.handleChange} />
        </div>

        <div className='row'>
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
                {_.map(emails, ({ address, verified }) => [
                  <ListItem
                    key={address}
                    primaryText={address}
                    secondaryText={`${verified ? 'V' : 'Não v'}erificado`}
                    nestedItems={verified ? undefined : [
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
                    initiallyOpen={false} />,
                    <Divider />,
                ])}
              </List>
            </Paper>
          </div>) : undefined}

      </div>
    );
  },
});

export default StudentSetupFormUserEmails;

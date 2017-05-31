import React from 'react';
import i18n from 'meteor/universe:i18n';
import { RaisedButton, Divider, TextField } from 'material-ui';

import PublicLoginAuthentication from './mixins/Authentication.jsx';
import PublicLoginForgot from './Forgot.jsx';
import PublicLoginRegister from './Register.jsx';

const PublicLoginEnter = React.createClass({
  mixins: [PublicLoginAuthentication],

  // styles

  styles: {
    column: {
      className: 'sixteen wide column',
      style: { paddingBottom: '0px' },
    },
  },

  getInitialState() {
    return { passwordDialog: false, register: false };
  },

  handlePasswordChange() {
    const { passwordDialog } = this.state;
    this.setState({ passwordDialog: !passwordDialog });
  },

  handleRegisterChange() {
    const { register } = this.state;
    this.setState({ register: !register });
  },

  // render

  render() {
    const { state: { email, passwordDialog, password, register }, styles } = this;
    const texts = {
      emailMessage: i18n.__('PublicLoginEnter.emailMessage'),
      noAccount: i18n.__('PublicLoginEnter.noAccount'),
      register: i18n.__('PublicLoginEnter.register'),
      forgotPassword: i18n.__('PublicLoginEnter.forgotPassword'),
    };

    return (
      <div>

        <div {...styles.column}>
          <h4>{texts.emailMessage}</h4>
          <TextField
            floatingLabelText='E-mail'
            value={email}
            name='email'
            type='email'
            onInput={this.handleInput}
            onKeyDown={this.handlePressEnter} />
          <br/>
          <TextField
            floatingLabelText='Senha'
            value={password}
            type='password'
            name='password'
            onInput={this.handleInput}
            onKeyDown={this.handlePressEnter} />
        </div>

        <div {...styles.column}>
          <RaisedButton
            label='Entrar'
            primary={true}
            onClick={this.handleLogin} />
        </div>

        <div {...styles.column}>
          <Divider />
        </div>

        {/* <div {...styles.column}>
          <h5>{texts.noAccount}
            <a href={FlowRouter.path('PublicLogin', {}, { tab: 'register' })}> {texts.register}
            </a>
          </h5>
        </div> */}
        <div {...styles.column} style={{ marginBottom: '15px' }} >
          <div style={{ cursor: 'pointer',
            color: 'blue',
            marginTop: '20px', }}
            onTouchTap={this.handlePasswordChange} >
            <h5>{texts.forgotPassword}</h5>
          </div>
          <div style={{ cursor: 'pointer',
            color: 'blue',
            marginTop: '20px', }}
            onTouchTap={this.handleRegisterChange} >
            <h5>{texts.register}</h5>
          </div>
          <PublicLoginForgot open={passwordDialog} handleClose={this.handlePasswordChange} />
          <PublicLoginRegister
            open={register}
            doc={new Meteor.users.FormSchema({ role: 'student' })}
            handleClose={this.handleRegisterChange}
          />
        </div>

      </div>
    );
  },

});

export default PublicLoginEnter;

import React from 'react';
import i18n from 'meteor/universe:i18n';
import { RaisedButton, Divider, TextField } from 'material-ui';

import PublicLoginAuthentication from './mixins/Authentication.jsx';
import PublicLoginForgot from './Forgot.jsx';

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
    return { open: false };
  },

  handlePasswordChange() {
    const { open } = this.state;
    this.setState({ open: !open });
  },

  // render

  render() {
    const { state: { email, password, open }, styles } = this;
    const texts = {
      socialMessage: i18n.__('PublicLoginEnter.socialMessage'),
      emailMessage: i18n.__('PublicLoginEnter.emailMessage'),
      noAccount: i18n.__('PublicLoginEnter.noAccount'),
      register: i18n.__('PublicLoginEnter.register'),
      forgotPassword: i18n.__('PublicLoginEnter.forgotPassword'),
    };

    return (
      <div className='row' style={{ marginTop: '15px' }}>
        <div className='ui center aligned grid'>

          <div {...styles.column}>
            <h4>{texts.socialMessage}</h4>
          </div>

          <div {...styles.column}>
            <button className='ui facebook button' onClick={this.handleFacebookLogin}>
              <i className='facebook icon' />Facebook
            </button>
            <button className='ui google plus button' onClick={this.handleGoogleLogin}>
              <i className='google plus icon' />Google Plus
            </button>
          </div>

          <div {...styles.column}>
            <Divider />
          </div>

          <div {...styles.column}>
            <h4>{texts.emailMessage}</h4>
            <TextField
              floatingLabelText='E-mail'
              value={email}
              name='email'
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
            <PublicLoginForgot open={open} handleClose={this.handlePasswordChange} />
          </div>

        </div>
      </div>
    );
  },

});

export default PublicLoginEnter;

import React from 'react';
import i18n from 'meteor/universe:i18n';
import { RaisedButton, Divider, TextField } from 'material-ui';

import PublicLoginAuthentication from './mixins/Authentication.jsx';

const PublicLoginSocial = React.createClass({
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
    };

    return (
      <div>

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

      </div>
    );
  },

});

export default PublicLoginSocial;

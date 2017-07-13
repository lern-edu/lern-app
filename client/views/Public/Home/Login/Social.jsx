import React from 'react';
import i18n from 'meteor/universe:i18n';
import { RaisedButton, Divider, TextField } from 'material-ui';

import PublicHomeAuthentication from './mixins/Authentication.jsx';

// styles

const styles =  {
  column: {
    className: 'sixteen wide column',
    style: { paddingBottom: '0px' },
  },
};

class PublicHomeSocial extends React.Component {

  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  // render

  render() {
    const { email, password, open } = this.state;
    const { authentication } = this.props;
    const texts = {
      socialMessage: i18n.__('PublicLoginEnter.socialMessage'),
    };

    return (
      <div>

          <div {...styles.column}>
            <button
              className='ui facebook button'
              onClick={authentication.handleFacebookLogin.bind(authentication)}
            >
              <i className='facebook icon' />Facebook
            </button>
            <button
              className='ui google plus button'
              onClick={authentication.handleGoogleLogin.bind(authentication)}
            >
              <i className='google plus icon' />Google Plus
            </button>
          </div>

      </div>
    );
  }

};

export default PublicHomeAuthentication(PublicHomeSocial);

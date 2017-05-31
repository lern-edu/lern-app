import React from 'react';
import i18n from 'meteor/universe:i18n';
import { RaisedButton, Divider, TextField } from 'material-ui';

const PublicLoginEnter = React.createClass({

  // styles

  styles: {
    column: {
      className: 'sixteen wide column',
      style: { paddingBottom: '0px' },
    },
  },

  // render

  render() {
    const { styles } = this;
    return (
      <div {...styles.column}>
        <a href={FlowRouter.path('PublicHome')} >
          <img
            style={{ display: 'inline-block' }}
            className='ui medium image'
            src='/images/login/lern.png'
          />
        </a>
      </div>
    );
  },

});

export default PublicLoginEnter;

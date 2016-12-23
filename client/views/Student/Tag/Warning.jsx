import React from 'react';
import { FontIcon, Styles } from 'material-ui';
import { grey300 } from 'material-ui/styles/colors';

StudentTagWarning = React.createClass({
  render() {
    return (
      <div className='ui basic center aligned segment'>
        <div className='ui icon header'>
          <FontIcon className='material-icons' color={grey300}>lightbulb_outline</FontIcon>
          <div className='content' style={{ color: grey300 }}>
            Página em construção
          </div>
        </div>
      </div>
    );
  },
});

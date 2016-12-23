import React from 'react';
import { FontIcon } from 'material-ui';
import { grey300, grey400 } from 'material-ui/styles/colors';

StudentTestsListEmpty = React.createClass({
  render() {
    const { empty: opts } = this.props.category;

    return (
      <div className='ui center aligned basic segment'>
        <h1 className='ui icon header'>
          <FontIcon className='material-icons' style={{ fontSize: 100 }} color={grey300}>{opts.icon}</FontIcon>
          <div className='content' style={{ color: grey300 }}>
            {opts.title}
            <div className='sub header' style={{ color: grey400 }}>{opts.subtitle}</div>
          </div>
        </h1>
      </div>
    );
  },
});

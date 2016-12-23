import React from 'react';

AdminTestHeader = React.createClass({
  render() {
    const { test, subjects } = this.props;

    return (
      <div className='ui basic segment'>
        <div className='ui header'>
          <div className='content'>
            {test.name}
            <div className='sub header'>
              {`${_.map(subjects, 'name').join(' - ')}`}
            </div>
          </div>
        </div>
      </div>
    );
  },
});

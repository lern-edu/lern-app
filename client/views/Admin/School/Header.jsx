import React from 'react';

AdminSchoolHeader = React.createClass({
  render() {
    const { course: { name } } = this.props;

    return (
      <div className='ui basic segment'>
        <div className='ui header'>
          <div className='content'>
            {name}
          </div>
        </div>
      </div>
    );
  },
});

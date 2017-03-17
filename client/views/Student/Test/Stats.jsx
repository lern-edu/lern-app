import React from 'react';

const StudentTestStats = React.createClass({
  render() {
    return (
      <div className='ui two statistics'>
        <div className='statistic'>
          <div className='value'>1</div>
          <div className='label'>Label</div>
        </div>
        <div className='statistic'>
          <div className='value'>1</div>
          <div className='label'>Label</div>
        </div>
      </div>
    );
  },
});

export default StudentTestStats;

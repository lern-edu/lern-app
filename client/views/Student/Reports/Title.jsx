import React from 'react';

StudentReportsTitle = React.createClass({
  render() {
    const { title, color, value, size } = this.props;
    return (
      <div className='title'>
        <div className='ui grid'>
          <div className='twelve wide column'>
            <div className={`ui header ${size}`}>
              <div className={`ui empty ${size} circular ${color} label`} style={{ marginRight: 10 }}/>
              <div className='content'>{title}</div>
            </div>
          </div>
          <div className='four wide center aligned column'>
            <div className='ui mini statistic'>
              <div className='value'>
                {numeral(value).format('0%')}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
});

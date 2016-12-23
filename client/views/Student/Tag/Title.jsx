import React from 'react';

StudentTagTitle = React.createClass({
  render() {
    const { tag, subject } = this.props;

    return (
      <div className='ui basic segment'>
        <h1 className='ui header'>
          <div className='content'>
            {tag.text}
            <div className='sub header'>{subject.name}</div>
          </div>
        </h1>
      </div>
    );
  },
});

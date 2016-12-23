import React from 'react';

AdminUserCreateFormSteps = React.createClass({
  classes: 'ui two steps',
  items: [
    {
      icon: 'truck',
      title: 'Primeiro',
    },
    {
      icon: 'truck',
      title: 'Segundo',
    },
  ],

  /* Render
  */

  render() {
    const { index } = this.props;

    return (
      <div className={this.classes}>

        {_.map(this.items, (v, i) =>
          <div className={`step ${index === i ? 'active' : index > i ? 'completed' : ''}`} key={i}>
            <i className={`${v.icon} icon`} />
            <div className='content'>
              <div className='title'>{v.title}</div>
            </div>
          </div>
        )}

      </div>
    );
  },
});

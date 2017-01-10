import React from 'react';

const AdminPlanHeader = React.createClass({
  render() {
    const { plan } = this.props;

    return (
      <div className='ui basic segment'>
        <div className='ui header'>
          <div className='content'>
            {plan.name}
            <div className='sub header'>
              {`${plan.sizeSmall} + ${plan.sizeBig}`}
            </div>
          </div>
        </div>
      </div>
    );
  },
});

export default AdminPlanHeader;

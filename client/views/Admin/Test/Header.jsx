import React from 'react';

const AdminTestHeader = React.createClass({
  render() {
    const { test, subjects } = this.props;

    return (
      <div className='ui basic segment'>
        <div className='ui header'>
          <div className='content'>
            {_.get(test, 'name')}
            <div className='sub header'>
              <b>Matérias: </b>
              {
                _.map(
                  test.get('subjects'),
                  _id => _.get(
                    _.find(subjects, { _id }),
                    'name'
                  ),
                ).join(' - ')
              }
            </div>
          </div>
        </div>
      </div>
    );
  },
});

export default AdminTestHeader;

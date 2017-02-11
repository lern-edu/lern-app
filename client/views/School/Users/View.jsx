import React from 'react';

import SchoolUsersList from './List.jsx';

const SchoolUsersView = React.createClass({

  /* Render
  */

  render() {
    const { ready, courses, subjects } = this.props;

    return (
      <div className='ui container'>
        <Layout.Bar title='Alunos' />
        {/* <SchoolUsersToolbar key='toolbar'/> */}
        <SchoolUsersList key='list'/>
      </div>
    );
  },
});

export default SchoolUsersView;

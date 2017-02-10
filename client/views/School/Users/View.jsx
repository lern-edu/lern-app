import React from 'react';

import SchoolUsersList from './List.jsx';

/*const*/ SchoolUsers = React.createClass({

  /* Render
  */

  render() {
    const { ready, courses, subjects } = this.props;

    return (
      <div className='ui container'>
        <Layout.Bar title='Alunos' />
        <a href={FlowRouter.path('SchoolCourses')}>Que tal gerenciar seus cursos?</a>
        <a href={FlowRouter.path('SchoolUsers')}>Que tal gerenciar alunos e professores?</a>
        {/* <SchoolHomeToolbar /> */}
      </div>
    );
  },
});

// export default SchoolUsersView;

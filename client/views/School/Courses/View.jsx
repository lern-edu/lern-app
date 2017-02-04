// Libs
import React from 'react';

// Views
import SchoolCoursesToolbar from './Toolbar.jsx';
import SchoolCoursesList from './List.jsx';

const SchoolCoursesView = React.createClass({

  /* Render
  */

  render() {
    const { ready, courses, subjects } = this.props;

    return (
      <div className='ui container'>
        <Layout.Bar title='Home' />
        <SchoolCoursesToolbar />
        <SchoolCoursesList />
      </div>
    );
  },
});

export default SchoolCoursesView;

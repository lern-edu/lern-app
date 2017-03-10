// Libs
import React from 'react';

// Views
import StudentCourseShowHomeTitle from './Title.jsx';
import StudentCourseShowHomeContent from './Content.jsx';
import StudentCourseShowHomeTags from './Tags.jsx';

const StudentCourseShowHome = React.createClass({

  /* Render
  */

  render() {
    const { course } = this.props;

    return (
      <div className='ui basic segment'>

        <StudentCourseShowHomeTitle {...this.props} />

        <StudentCourseShowHomeContent {...this.props} />

        <StudentCourseShowHomeTags {...this.props} />

      </div>
    );
  },
});

export default StudentCourseShowHome;

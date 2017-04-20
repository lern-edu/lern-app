// Libs
import React from 'react';

// Views
import TeacherCourseShowHomeTitle from './Title.jsx';
import TeacherCourseShowHomeContent from './Content.jsx';
import TeacherCourseShowHomeTags from './Tags.jsx';

const TeacherCourseShowHome = React.createClass({

  /* Render
  */

  render() {
    const { course } = this.props;

    return (
      <div className='ui basic segment'>

        <TeacherCourseShowHomeTitle {...this.props} />

        <TeacherCourseShowHomeContent {...this.props} />

        <TeacherCourseShowHomeTags {...this.props} />

      </div>
    );
  },
});

export default TeacherCourseShowHome;

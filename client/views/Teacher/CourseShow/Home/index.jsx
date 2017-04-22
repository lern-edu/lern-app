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
    const { course, ready } = this.props;

    return (
      <div className='ui basic segment'>

        {
          !_.every(ready)
          ? <LinearProgress />
          : [
            <TeacherCourseShowHomeTitle {...this.props} key='title' />,
            <TeacherCourseShowHomeContent {...this.props} key='content' />,
            <TeacherCourseShowHomeTags {...this.props} key='tags' />,
          ]
        }

      </div>
    );
  },
});

export default TeacherCourseShowHome;

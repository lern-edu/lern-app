// Libs
import React from 'react';
import { LinearProgress } from 'material-ui';

// Views
import TeacherLectureAttendanceTitle from './Title.jsx';
import TeacherLectureAttendanceTable from './Table.jsx';

const TeacherLectureAttendanceView = React.createClass({
  /* Render
  */

  render() {
    const { ready, lecture, course } = this.props;

    return (
      <div className='ui container'>

        <Layout.Bar
          title='Presença'
          crumbs={[
            {
              label: _.get(course, 'name'),
              path: FlowRouter.path('TeacherCourseShow', { courseId: _.get(course, '_id') }),
            },
          ]}
        />

        {
          !_.every(ready)
          ? <LinearProgress />
          : [
            <TeacherLectureAttendanceTitle {...this.props} key='title' />,
            <TeacherLectureAttendanceTable {...this.props} doc={lecture} key='table' />,
          ]
        }

      </div>
    );
  },
});

export default TeacherLectureAttendanceView;

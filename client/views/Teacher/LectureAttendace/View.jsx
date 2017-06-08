// Libs
import React from 'react';
import { LinearProgress } from 'material-ui';

// Views
import TeacherLectureAttendanceTitle from './Title.jsx';
import TeacherLectureAttendanceTable from './Table.jsx';
import TeacherLectureAttendanceContent from './Content.jsx';

const TeacherLectureAttendanceView = React.createClass({
  /* Render
  */

  render() {
    const { ready, lecture, course } = this.props;

    return (
      <div className='ui container'>

        <Layout.Bar
          title={_.get(lecture, 'name')}
          crumbs={[
            {
              label: _.get(course, 'name'),
              path: FlowRouter.path(
                'TeacherCourseShow',
                { courseId: _.get(course, '_id') },
                { active: 'lectures' },
              ),
            },
          ]}
        />

        {
          !_.every(ready)
          ? <LinearProgress />
          : [
            <TeacherLectureAttendanceContent {...this.props} key='content' />,
            <TeacherLectureAttendanceTitle {...this.props} key='title' />,
            <TeacherLectureAttendanceTable {...this.props} doc={lecture} key='table' />,
          ]
        }

      </div>
    );
  },
});

export default TeacherLectureAttendanceView;

import React from 'react';

TeacherLectureAttendanceView = React.createClass({
  mixins: [ReactMeteorData],

  /* Reactive Data Fetching
  */

  getMeteorData() {
    const { courseId, lectureId } = this.props;

    const handles = {
      course: Meteor.subscribe('TeacherCourses', { courseId },
        { users: true, lectures: true, tags: true }),
    };

    const data = {
      ready: _.mapValues(handles, h => h.ready()),
      course: _.first(Fetch.General.courses(courseId).fetch()),
      lecture: _.first(Fetch.General.lectures(lectureId).fetch()),
    };

    data.students = data.course && data.course.findStudents().fetch();
    data.tags = data.course && data.course.findTags().fetch();

    return data;
  },
  /* Render
  */

  render() {
    const { ready, lecture, course } = this.data;

    return (
      <div className='ui container'>

        <Layout.Bar
          title='Aula'
          crumbs={[
            { label: 'Disciplinas', path: 'TeacherCourses' },
            { label: _.get(course, 'name'),
              path: FlowRouter.path('TeacherCourseShow',
              { courseId: _.get(course, '_id') }), },
          ]} />

        {!_.every(ready) ? <MUI.LinearProgress />
          : <TeacherLectureAttendanceForm {...this.data} doc={lecture} />}

      </div>
    );
  },
});

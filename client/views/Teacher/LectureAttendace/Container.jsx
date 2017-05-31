// Libs
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

// Views
import TeacherLectureAttendanceView from './View.jsx';

TeacherLectureAttendance = createContainer(({ courseId, lectureId }) => {

  const handles = {
    course: Meteor.subscribe(
      'TeacherCourses',
      { courseId },
      { users: true, lectures: true }
    ),
    tags: Meteor.subscribe('PublicTags'),
    subjects: Meteor.subscribe('PublicSubjects'),
  };

  const data = {
    ready: _.mapValues(handles, h => h.ready()),
    course: _.first(Fetch.General.courses(courseId).fetch()),
    lecture: _.first(Fetch.General.lectures(lectureId).fetch()),
    tags: Fetch.Public().tags().fetch(),
    subjects: Fetch.Public().subjects().fetch(),
  };

  data.students = data.course && data.course.findStudents().fetch();

  return data;
}, TeacherLectureAttendanceView);

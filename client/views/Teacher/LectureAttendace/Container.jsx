// Libs
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

// Views
import TeacherLectureAttendanceView from './View.jsx';

TeacherLectureAttendance = createContainer(({ courseId, lectureId }) => {

  const handles = {
    lectures: Meteor.subscribe(
      'TeacherLectures',
      { lectureId },
      {
        author: true,
        students: true,
        course: true,
        subjects: true,
        tags: true,
      }
    ),
  };

  const data = {
    ready: _.mapValues(handles, h => h.ready()),
    lecture: _.first(Fetch.General.lectures().fetch()),
  };

  data.course = data.lecture && _.head(data.lecture.findCourse().fetch());
  data.students = data.lecture && data.course && data.course.findStudents().fetch();
  data.subjects = data.lecture && data.lecture.findSubjects().fetch();
  data.tags = data.lecture && data.lecture.findTags().fetch();
  data.author = data.lecture && _.head(data.lecture.findAuthor().fetch());

  return data;
}, TeacherLectureAttendanceView);

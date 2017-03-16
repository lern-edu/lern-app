// Libs
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

// Views
import StudentCourseShowView from './View.jsx';

StudentCourseShow = createContainer(({ courseId }) => {

  const userId = Meteor.userId();

  const handles = {
    course: Meteor.subscribe(
      'StudentCourses',
      { courseId },
      {
        posts: true,
        users: true,
        tests: true,
        lectures: true,
        attempts: true,
        answers: true,
        questions: true,
        subjects: true,
        tags: true,
      }
    ),
  };

  const data = {
    ready: _.mapValues(handles, h => h.ready()),
    course: _.first(Fetch.General.courses(courseId).fetch()),
    images: Fetch.General.images().fetch(),
    documents: Fetch.General.documents().fetch(),
    attempts: Fetch.General.attempts().fetch(),
    answers: Fetch.General.answers().fetch(),
    questions: Fetch.General.questions().fetch(),
  };

  data.students = data.course && data.course.findStudents().fetch();
  data.teachers = data.course && data.course.findTeachers().fetch();
  data.tests = data.course && data.course.findCurrentTests().fetch();
  data.posts = data.course && data.course.findPosts().fetch();
  data.lectures = data.course && data.course.findLectures().fetch();
  data.subjects = data.course && data.course.findSubjects().fetch();
  data.tags = data.course && data.course.findTags().fetch();

  return data;

}, StudentCourseShowView);

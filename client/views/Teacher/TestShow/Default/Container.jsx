import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

//Views
import TeacherTestShowDefaultView from './View.jsx';

TeacherTestShowDefault = createContainer(({ testId, courseId }) => {
  const userId = Meteor.userId();

  const handles = {
    test: Meteor.subscribe('TeacherTest', testId, {
        attempts: true,
        documents: true,
        subjects: true,
        images: true,
        tags: true,
        questions: true,
        answers: true, }),
    course: Meteor.subscribe('TeacherCourses', { courseId: courseId },
      { users: true, grades: true }),
  };

  const data = {
    ready: _.mapValues(handles, h => h.ready()),
    test: _.first(Fetch.General.tests(testId).fetch()),
    course: _.first(Fetch.General.courses(courseId).fetch()),
  };

  data.questions = data.test && data.test.findQuestions().fetch();
  data.images = data.test && data.questions && _.flatten(_.map(data.questions, q =>
    q.findAllImages().fetch()));
  data.documents = data.test && data.test.findDocuments().fetch();
  data.attempts = data.test && data.test.findAttempts().fetch();
  data.subjects = data.test && data.test.findSubjects().fetch();
  data.tags = data.test && data.test.findTags().fetch();
  data.answers = data.test && data.test.findAnswers().fetch();
  data.students = data.course && data.course.findStudents().fetch();
  data.grades = data.course && data.course.findGrades().fetch();

  return data;
}, TeacherTestShowDefaultView);

import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

//Views
import TeacherTestShowByTagsView from './View.jsx';

TeacherTestShowByTags = createContainer(({ testId, courseId }) => {
  const userId = Meteor.userId();

  const handles = {
    test: Meteor.subscribe('TeacherTest', testId, {
        attempts: true,
        documents: true,
        subjects: true,
        images: true,
        tags: true,
        questions: true,
        answers: true,
        course: true,
        users: true,
      }),
  };

  const data = {
    ready: _.mapValues(handles, h => h.ready()),
    test: _.first(Fetch.General.tests(testId).fetch()),
  };

  data.questions = data.test && data.test.findQuestions().fetch();
  data.images = data.test && data.questions && _.flatten(_.map(data.questions, q =>
    q.findAllImages().fetch()));
  data.documents = data.test && data.test.findDocuments().fetch();
  data.course = data.test && _.first(data.test.findCourse().fetch());
  data.users = data.test && data.course &&  data.course.findUsers().fetch();
  data.attempts = data.test && data.test.findAttempts().fetch();
  data.subjects = data.test && data.test.findSubjects().fetch();
  data.tags = data.test && data.test.findTags().fetch();
  data.answers = data.test && data.test.findAnswers().fetch();
  data.students = data.course && data.course.findStudents().fetch();
  data.grades = data.course && data.course.findGrades().fetch();

  return data;
}, TeacherTestShowByTagsView);

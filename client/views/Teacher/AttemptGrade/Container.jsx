// Libs
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

// Views
import TeacherAttemptGradeView from './View.jsx';

TeacherAttemptGrade = createContainer(({ testId, attemptId }) => {
  const userId = Meteor.userId();

  const handles = {
    test: Meteor.subscribe('TeacherTest', testId, { questions: true, course: true }),
    attempt: Meteor.subscribe('TeacherAttempt', attemptId, { answers: true, author: true }),
  };

  const data = {
    ready: _.mapValues(handles, h => h.ready()),
    test: _.first(Fetch.General.tests(testId).fetch()),
    attempt: _.first(Fetch.General.attempts(attemptId).fetch()),
  };

  data.answers = data.attempt && data.attempt.findAnswers().fetch();
  data.author = data.attempt && _.first(data.attempt.findAuthor().fetch());
  data.questions = data.test && data.test.findQuestions().fetch();
  data.course = _.first(data.test && data.test.findCourse().fetch());

  return data;
}, TeacherAttemptGradeView);

// Libs
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

// Views
import StudentAttemptDefaultView from './View.jsx';

StudentAttemptDefault = createContainer(({ testId, attemptId }) => {

  const handles = {
    test: Meteor.subscribe('StudentTests', { testId }, {
      attempts: true,
      questions: true,
      subjects: true,
      course: true,
      tags: true,
    }),
    attempt: Meteor.subscribe('StudentAttempts', { attemptId }, {
      answers: true,
    }),
  };

  const data = {
    ready: _.mapValues(handles, h => h.ready()),
    test: _.first(Fetch.General.tests(testId).fetch()),
    attempt: _.first(Fetch.General.attempts(attemptId).fetch()),
  };

  data.attempts = data.test && data.test.findAttempts().fetch();
  data.questions = data.test && data.test.findQuestions().fetch();
  data.subjects = data.test && data.test.findSubjects().fetch();
  data.course = data.test && _.head(data.test.findCourse().fetch());
  data.tags = data.test && data.test.findTags().fetch();
  data.answers = data.attempt && data.attempt.findAnswers().fetch();
  data.images = data.questions && _.flatten(_.map(data.questions, q => q.findAllImages().fetch()));

  return data;
}, StudentAttemptDefaultView);

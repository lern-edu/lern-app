// Libs
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

// Views
import StudentTestView from './View.jsx';

StudentTest = createContainer(({ testId }) => {

  const handles = {
    test: Meteor.subscribe('StudentTests', { testId }, {
      questions: true,
      attempts: true,
      subjects: true,
      course: true,
      tags: true,
    }),
  };

  const data = {
    ready: _.mapValues(handles, h => h.ready()),
    test: _.first(Fetch.General.tests(testId).fetch()),
  };

  data.questions = data.test && data.test.findQuestions().fetch();
  data.attempts = data.test && data.test.findAttempts().fetch();
  data.subjects = data.test && data.test.findSubjects().fetch();
  data.course = data.test && _.head(data.test.findCourse().fetch());
  data.tags = data.test && data.test.findTags().fetch();

  return data;

}, StudentTestView);

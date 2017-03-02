// Libs
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

// Views
import StudentTestAttemptView from './View.jsx';

StudentTestAttempt = createContainer(({ testId, index=0 }) => {
  const userId = Meteor.userId();

  const handles = {
    test: Meteor.subscribe('StudentTests', { testId }, {
      questions: true,
      course: true,
      subjects: true,
      tags: true,
    }),
    attempt: Meteor.subscribe('StudentAttempt', testId, {
      answers: true,
    }),
  };

  const data = {
    ready: _.mapValues(handles, h => h.ready()),
    attempt: _.first(Fetch.User(userId).attempts({
        test: testId, finished: null, last: true, }).fetch()),
    test: _.first(Fetch.General.tests(testId).fetch()),
  };

  data.questions = data.test && data.test.findQuestions().fetch();
  data.course = data.test && _.first(data.test.findCourse().fetch());
  data.answers = data.attempt && data.attempt.findAnswers().fetch();
  data.pages = data.test && data.questions && {
    questions: _.map(
      data.test.get('pages'),
      (p, index) => data.test.findPageQuestions(index).fetch()
    ),
    answers: data.attempt && _.map(
      data.test.get('pages'),
      (p, index) => data.attempt.findPageAnswers({ index, author: userId }).fetch()
    ),
  };

  _.forEach(data.questions, (q) => q.images = q.findAllImages().fetch());

  return data;
}, StudentTestAttemptView);

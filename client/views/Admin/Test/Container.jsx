// Libs
import { createContainer } from 'meteor/react-meteor-data';

// View
import AdminTestView from './View.jsx';

AdminTest = createContainer(({ testId }) => {

  const handles = {
    test: Meteor.subscribe('AdminTests', { testId },
      { subjects: true, tags: true, questions: true, course: true }),
    subjects: Meteor.subscribe('PublicSubjects'),
  };

  const data = {
    ready: _.mapValues(handles, h => h.ready()),
    subjects: Fetch.Public().subjects().fetch(),
    test: _.first(Fetch.General.tests(testId).fetch()),
  };

  data.tags = data.test && data.test.findTags().fetch();
  data.questions = data.test && data.test.findQuestions().fetch();
  data.course = data.test && data.test.findCourse().fetch();
  data.documents = data.test && _.first(data.test.findDocuments().fetch());

  return data;
}, AdminTestView);

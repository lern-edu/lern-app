// Libs
import { createContainer } from 'meteor/react-meteor-data';

// View
import TeacherTestsCreateView from './View.jsx';

TeacherTestCreate = createContainer(({ testId }) => {

  const handles = {
    subjects: Meteor.subscribe('PublicSubjects'),
  };

  if (testId) handles.tests = Meteor.subscribe('TeacherTests', { testsIds: testId });

  const data = {
    ready: _.mapValues(handles, h => h.ready()),
    subjects: Fetch.Public().subjects().fetch(),
  };

  if (testId) data.test = _.head(Fetch.General.tests(testId).fetch());

  return data;
}, TeacherTestsCreateView);

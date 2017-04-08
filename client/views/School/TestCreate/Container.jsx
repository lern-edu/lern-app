// Libs
import { createContainer } from 'meteor/react-meteor-data';

// View
import SchoolTestCreateView from './View.jsx';

SchoolTestCreate = createContainer(({ testId }) => {

  const handles = {
    subjects: Meteor.subscribe('PublicSubjects'),
  };

  if (testId) handles.tests = Meteor.subscribe('SchoolTests', { testsIds: testId });

  const data = {
    ready: _.mapValues(handles, h => h.ready()),
    subjects: Fetch.Public().subjects().fetch(),
  };

  if (testId) data.test = _.head(Fetch.General.tests(testId).fetch());

  return data;
}, SchoolTestCreateView);

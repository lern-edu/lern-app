// Libs
import { createContainer } from 'meteor/react-meteor-data';

// View
import SchoolTestsView from './View.jsx';

SchoolTests = createContainer(() => {
  const userId = Meteor.userId();

  const handles = {
    tests: Meteor.subscribe('SchoolTests', {}, { course: true }),
  };

  const data = {
    ready: _.mapValues(handles, h => h.ready()),
    tests: Fetch.General.tests().fetch(),
  };

  data.courses = data.tests
    && Fetch.General.courses(
      _.map(data.tests, 'course')
    ).fetch();

  return data;
}, SchoolTestsView);

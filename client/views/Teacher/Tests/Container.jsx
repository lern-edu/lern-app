// Libs
import { createContainer } from 'meteor/react-meteor-data';

// View
import TeacherTestsView from './View.jsx';

TeacherTests = createContainer(() => {
  const userId = Meteor.userId();

  const handles = {
    tests: Meteor.subscribe('TeacherTests', {}, { course: true }),
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
}, TeacherTestsView);

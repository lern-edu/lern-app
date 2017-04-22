// Libs
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

// Views
import TeacherHomeView from './View.jsx';

TeacherHome = createContainer(() => {
  const user = Meteor.user();

  const handles = {
      courses: Meteor.subscribe('TeacherCourses'),
    };

  const data = {
    ready: _.mapValues(handles, h => h.ready()),
    courses: Fetch.General.courses().fetch(),
  };

  return data;
}, TeacherHomeView);

// Libs
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

// Views
import SchoolUsersView from './View.jsx';

SchoolUsers = createContainer(({ params }) => {
  const handles = {
    users: Meteor.subscribe('AdminUsers'),
    courses: Meteor.subscribe('AdminCourses'),
  };

  return {
    ready: _.mapValues(handles, h => h.ready()),
    users: Fetch.General.users().fetch(),
    courses: Fetch.General.courses().fetch(),
  };

}, SchoolUsersView);

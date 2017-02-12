// Libs
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

// Views
import SchoolUsersView from './View.jsx';

SchoolUsers = createContainer(({ params }) => {
  const userId = Meteor.userId();
  const handles = {
    students: Meteor.subscribe('SchoolStudents'),
  };

  const data = {
    ready: _.mapValues(handles, h => h.ready()),
    students: Fetch.School(userId).students().fetch(),
  };

  return data;
}, SchoolUsersView);

// Libs
import { createContainer } from 'meteor/react-meteor-data';

// View
import AdminHomeView from './View.jsx';

AdminHome = createContainer(() => {
  const handles = {
    subjects: Meteor.subscribe('PublicSubjects'),
    tags: Meteor.subscribe('PublicTags'),
    users: Meteor.subscribe('AdminUsers'),
    courses: Meteor.subscribe('AdminCourses'),
  };

  return {
    ready: _.mapValues(handles, h => h.ready()),
    subjects: Fetch.Public().subjects().fetch(),
    tags: Fetch.Public().tags().fetch(),
    users: Fetch.General.users().fetch(),
    courses: Fetch.General.courses().fetch(),
  };
}, AdminHomeView);

import { createContainer } from 'meteor/react-meteor-data';

// View
import SchoolUsersListView from './List.jsx';

export default SchoolUsersList = createContainer((props) => {
  const userId = Meteor.userId();
  const handles = {
    students: Meteor.subscribe('SchoolStudents'),
  };
  const data = {
    ready: _.mapValues(handles, h => h.ready()),
    students: Fetch.School(userId).students().fetch(),
  };

  return data;
}, SchoolUsersListView);

import { createContainer } from 'meteor/react-meteor-data';

// View
import SchoolUsersListView from './List.jsx';

export default SchoolUsersList = createContainer((props) => {
  const userId = Meteor.userId();
  const handles = {
    users: Meteor.subscribe('SchoolUsers'),
  };

  return {
    ready: _.mapValues(handles, h => h.ready()),
    users: Fetch.School(userId).users().fetch(),
  };
}, SchoolUsersListView);

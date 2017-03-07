// Libs
import { createContainer } from 'meteor/react-meteor-data';

// View
import AdminTestCreateFormApplicationView from './Application.jsx';

export default AdminTestCreateFormApplication = createContainer((props) => {

  const handles = {
    courses: Meteor.subscribe('AdminCourses'),
  };

  const data = {
    ready: _.mapValues(handles, h => h.ready()),
    courses: Fetch.General.courses().fetch(),
  };

  return data;
}, AdminTestCreateFormApplicationView);

// Libs
import { createContainer } from 'meteor/react-meteor-data';

// View
import SchoolTestCreateFormApplicationView from './Application.jsx';

export default SchoolTestCreateFormApplication = createContainer((props) => {

  const handles = {
    courses: Meteor.subscribe('SchoolCourses'),
  };

  const data = {
    ready: _.mapValues(handles, h => h.ready()),
    courses: Fetch.General.courses().fetch(),
  };

  return data;
}, SchoolTestCreateFormApplicationView);

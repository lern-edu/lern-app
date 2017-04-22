// Libs
import { createContainer } from 'meteor/react-meteor-data';

// View
import TeacherTestCreateFormApplicationView from './Application.jsx';

export default TeacherTestCreateFormApplication = createContainer((props) => {

  const handles = {
    courses: Meteor.subscribe('SchoolCourses'),
  };

  const data = {
    ready: _.mapValues(handles, h => h.ready()),
    courses: Fetch.General.courses().fetch(),
  };

  return data;
}, TeacherTestCreateFormApplicationView);

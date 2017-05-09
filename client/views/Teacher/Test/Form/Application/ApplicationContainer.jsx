// Libs
import { createContainer } from 'meteor/react-meteor-data';

// View
import TeacherTestFormApplicationView from './Application.jsx';

export default TeacherTestFormApplication = createContainer((props) => {

  const handles = {
    courses: Meteor.subscribe('TeacherCourses'),
  };

  const data = {
    ready: _.mapValues(handles, h => h.ready()),
    courses: Fetch.General.courses().fetch(),
  };

  return data;
}, TeacherTestFormApplicationView);

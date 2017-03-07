// Libs
import { createContainer } from 'meteor/react-meteor-data';

// View
import SchoolCourseFormPeopleView from './People.jsx';

export default SchoolCourseFormPeople = createContainer((props) => {
  const userId = Meteor.userId();
  const handles = {
    students: Meteor.subscribe('SchoolStudents'),
    teachers: Meteor.subscribe('SchoolTeachers'),
  };

  const data = {
    ready: _.mapValues(handles, h => h.ready()),
    students: Fetch.School(userId).students().fetch(),
    teachers: Fetch.School(userId).teachers().fetch(),
  };

  return data;
}, SchoolCourseFormPeopleView);

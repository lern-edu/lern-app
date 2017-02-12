// Libs
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

// Views
import StudentCourseIngressFormCourseView from './Course.jsx';

const StudentCourseIngressFormCourse = createContainer(({ alias }) => {
  const handles = {
    course: Meteor.subscribe('StudentCourseByAlias', { alias }, { author: true }),
  };

  const data = {
    ready: _.mapValues(handles, h => h.ready()),
    course: _.head(Fetch.General.courses({ alias }).fetch()),
  };

  data.school = data.course && _.head(Fetch.General.users(data.course.get('author')).fetch());

  return data;
}, StudentCourseIngressFormCourseView);

export default StudentCourseIngressFormCourse;

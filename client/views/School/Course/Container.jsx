// Libs
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

// Views
import SchoolCourseView from './View.jsx';

SchoolCourse = createContainer(({ courseId }) => {
  const schoolId = Meteor.userId();

  const handles = {
    course: Meteor.subscribe('SchoolCourses', { courseIds: courseId }),
  };

  const data = {
    ready: _.mapValues(handles, h => h.ready()),
    course: _.head(Fetch.General.courses(courseId).fetch()),
  };

  return data;
}, SchoolCourseView);

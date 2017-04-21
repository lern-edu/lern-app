// Libs
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

// Views
import TeacherLectureCreateView from './View.jsx';

TeacherLectureCreate = createContainer(({ courseId }) => {

  const handles = {
    course: Meteor.subscribe('TeacherCourses', { courseId }),
    tags: Meteor.subscribe('PublicTags'),
    subjects: Meteor.subscribe('PublicSubjects'),
  };

  return {
    ready: _.mapValues(handles, h => h.ready()),
    course: _.first(Fetch.General.courses(courseId).fetch()),
    tags: Fetch.Public().tags().fetch(),
    subjects: Fetch.Public().subjects().fetch(),
  };
}, TeacherLectureCreateView);

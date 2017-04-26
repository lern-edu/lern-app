// Libs
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

// Views
import TeacherPostCreateView from './View.jsx';

TeacherPostCreate = createContainer(() => {

  const handles = {
    subjects: Meteor.subscribe('PublicSubjects'),
    tags: Meteor.subscribe('PublicTags'),
    courses: Meteor.subscribe('TeacherCourses'),
  };

  const data = {
    ready: _.mapValues(handles, h => h.ready()),
    courses: Fetch.General.courses().fetch(),
    tags: Fetch.Public().tags().fetch(),
    subjects: Fetch.Public().subjects().fetch(),
  };

  return data;
}, TeacherPostCreateView);

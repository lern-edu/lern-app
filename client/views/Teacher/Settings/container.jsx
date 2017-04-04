import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import TeacherSettingsView from './View.jsx';

TeacherSettings = createContainer(({ params }) => {

  const handles = {
    schools: Meteor.subscribe('UserSchools'),
    courses: Meteor.subscribe('TeacherCourses', {},
      { subjects: true, tags: true }),
  };
  const userId = Meteor.userId();

  return {
    ready: _.mapValues(handles, h => h.ready()),
    schools: Fetch.General.users({ roles: 'school' }).fetch(),
    ready: _.mapValues(handles, h => h.ready()),
    subjects: Fetch.Public().subjects().fetch(),
    tags: Fetch.Public().tags().fetch(),
    courses: Fetch.Teacher(userId).courses().fetch(),
  };
}, TeacherSettingsView);

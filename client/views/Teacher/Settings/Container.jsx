// Libs
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

// Views
import TeacherSettingsView from './View.jsx';

TeacherSettings = createContainer(() => {
  const handles = {
    schools: Meteor.subscribe('UserSchools'),
  };

  const userId = Meteor.userId();

  return {
    ready: _.mapValues(handles, h => h.ready()),
    schools: Fetch.General.users({ roles: 'school' }).fetch(),
  };

  return data;
}, TeacherSettingsView);

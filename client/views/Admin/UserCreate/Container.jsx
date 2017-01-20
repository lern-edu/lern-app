// Libs
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

// Views
import View from './View.jsx';

AdminUserCreateView = createContainer(({ params }) => {
  const handles = {
    schools: Meteor.subscribe('AdminUsers', { roles: 'school' }),
  };

  return {
    ready: _.mapValues(handles, h => h.ready()),
    schools: Fetch.General.users({ roles: 'school' }).fetch(),
  };
}, View);

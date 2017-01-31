// Libs
import { createContainer } from 'meteor/react-meteor-data';

// View
import View from './View.jsx';

AdminTestCreateView = createContainer(() => {

  const handles = {
    subjects: Meteor.subscribe('PublicSubjects'),
  };

  const data = {
    ready: _.mapValues(handles, h => h.ready()),
    subjects: Fetch.Public().subjects().fetch(),
  };

  return data;
}, View);

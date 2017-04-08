// Libs
import { createContainer } from 'meteor/react-meteor-data';

// View
import PublicContentCreateTestView from './index.jsx';

export default PublicContentCreateTest =
  createContainer(({ subject }) => {

  const handles = {
    subjects: Meteor.subscribe('PublicSubjects'),
  };

  const data = {
    ready: _.mapValues(handles, h => h.ready()),
    subjects: Fetch.Public().subjects().fetch(),
  };

  return data;
}, PublicContentCreateTestView);

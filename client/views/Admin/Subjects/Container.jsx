// Libs
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

// Views
import AdminSubjectsView from './View.jsx';

AdminSubjects = createContainer(({ params }) => {
  const handles = {
    subjects: Meteor.subscribe('PublicSubjects'),
  };

  return {
    ready: _.mapValues(handles, h => h.ready()),
    subjects: Fetch.Public().subjects().fetch(),
  };
}, AdminSubjectsView);

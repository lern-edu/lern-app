// Libs
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

// Views
import SchoolCourseCreateView from './View.jsx';

SchoolCourseCreate = createContainer(({ params }) => {
  const userId = Meteor.userId();

  const handles = {
    subjects: Meteor.subscribe('PublicSubjects'),
  };

  return {
    ready: _.mapValues(handles, h => h.ready()),
    subjects: Fetch.Public().subjects().fetch(),
  };

}, SchoolCourseCreateView);

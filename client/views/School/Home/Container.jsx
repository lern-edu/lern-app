// Libs
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

// Views
import SchoolHomeView from './View.jsx';

SchoolHome = createContainer(({ params }) => {
  const userId = Meteor.userId();

  const handles = [
    Meteor.subscribe('SchoolCourses'),
    Meteor.subscribe('PublicSubjects'),
  ];

  return {
    ready: _.every(handles, h => h.ready()),
    courses: Fetch.School(userId).courses().fetch(),
    subjects: Fetch.General.subjects().fetch(),
  };
}, SchoolHomeView);

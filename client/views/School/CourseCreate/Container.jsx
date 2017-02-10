// Libs
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

// Views
import SchoolCourseCreateView from './View.jsx';

SchoolCourseCreate = createContainer(({ params }) => {
  const userId = Meteor.userId();

  const handles = {
    subjects: Meteor.subscribe('PublicSubjects'),

    // tags: Meteor.subscribe('PublicTags'),
    // users: Meteor.subscribe('AdminSchoolUsers', userId),
  };

  return {
    ready: _.mapValues(handles, h => h.ready()),
    subjects: Fetch.Public().subjects().fetch(),

    // tags: Fetch.Public().tags().fetch(),
    // students: Fetch.School(schoolId).students().fetch(),
    // teachers: Fetch.School(schoolId).teachers().fetch(),
  };

}, SchoolCourseCreateView);

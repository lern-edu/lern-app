// Libs
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

// Views
import SchoolCourseFormView from './index.jsx';

const SchoolCourseForm = createContainer(() => {

  const handles = {
    subjects: Meteor.subscribe('PublicSubjects'),
  };

  const data = {
    ready: _.mapValues(handles, h => h.ready()),
    subjects: Fetch.Public().subjects().fetch(),
  };

  return data;
}, SchoolCourseFormView);

export default SchoolCourseForm;

// Libs
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

// Views
import AdminSubjectView from './View.jsx';

AdminSubject = createContainer(({ subjectId }) => {
  const handles = {
    subjects: Meteor.subscribe('PublicSubject', { subjectId }),
  };

  const data =  {
    ready: _.mapValues(handles, h => h.ready()),
    subject: _.head(Fetch.General.subjects().fetch()),
  };

  data.tags = data.subject && data.subject.findTags().fetch();

  return data;
}, AdminSubjectView);

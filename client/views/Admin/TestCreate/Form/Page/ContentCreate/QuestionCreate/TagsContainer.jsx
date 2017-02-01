// Libs
import { createContainer } from 'meteor/react-meteor-data';

// View
import AdminTestCreateFormPageQuestionCreateTagsView from './Tags.jsx';

export default AdminTestCreateFormPageQuestionCreateTags =
  createContainer(({ form }) => {
  const subject = form.doc.get('subject');

  const handles = {
    tags: Meteor.subscribe('PublicTags', { subjectIds: [subject] }),
  };

  const data = {
    ready: _.mapValues(handles, h => h.ready()),
    tags: Fetch.Public().tags({ subject }).fetch(),
  };

  return data;
}, AdminTestCreateFormPageQuestionCreateTagsView);

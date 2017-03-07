// Libs
import { createContainer } from 'meteor/react-meteor-data';

// View
import PublicContentCreateQuestionSearchTagsView from './Tags.jsx';

export default PublicContentCreateQuestionSearchTags =
  createContainer(({ subject }) => {

  const handles = {
    tags: Meteor.subscribe('PublicTags', { subjectIds: [subject] }),
  };

  const data = {
    ready: _.mapValues(handles, h => h.ready()),
    tags: Fetch.Public().tags().fetch(),
  };

  return data;
}, PublicContentCreateQuestionSearchTagsView);

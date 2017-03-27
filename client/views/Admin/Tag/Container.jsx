// Libs
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

// Views
import AdminTagView from './View.jsx';

AdminTag = createContainer(({ tagId, subjectId }) => {
  const handles = {
    tags: Meteor.subscribe('PublicTag', { tagId, subjectId }),
  };

  const data =  {
    ready: _.mapValues(handles, h => h.ready()),
    tag: _.head(Fetch.General.tags().fetch()),
  };

  data.subject = data.tag && _.head(data.tag.findSubject().fetch());

  return data;
}, AdminTagView);

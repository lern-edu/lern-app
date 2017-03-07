// Libs
import { createContainer } from 'meteor/react-meteor-data';

// View
import View from './View.jsx';

AdminQuestionCreateView = createContainer(() => {
  const images = Session.get('images');

  const handles = {
    subjects: Meteor.subscribe('PublicSubjects'),
    tags: Meteor.subscribe('PublicTags'),
  };

  if (images)
    handles.images = Meteor.subscribe('AdminImages', images);

  const data = {
    ready: _.mapValues(handles, h => h.ready()),
    subjects: Fetch.Public().subjects().fetch(),
    tags: Fetch.Public().tags().fetch(),
  };

  if (images)
    data.images = Fetch.General.images().fetch();

  return data;
}, View);

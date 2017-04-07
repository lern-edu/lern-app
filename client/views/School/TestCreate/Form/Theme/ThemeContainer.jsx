// Libs
import { createContainer } from 'meteor/react-meteor-data';

// View
import SchoolTestCreateFormThemeView from './Theme.jsx';

export default SchoolTestCreateFormTheme = createContainer(({ form }) => {
  const subjectIds = form.doc.get('subjects');

  const handles = {
    tags: Meteor.subscribe('PublicTags', { subjectIds }),
  };

  const data = {
    ready: _.mapValues(handles, h => h.ready()),
    tags: Fetch.Public().tags({ subject: { $in: subjectIds || [] } }).fetch(),
  };

  return data;
}, SchoolTestCreateFormThemeView);

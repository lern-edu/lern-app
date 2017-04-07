// Libs
import { createContainer } from 'meteor/react-meteor-data';

// View
import PublicContentCreateTestShowView from './Show.jsx';

export default PublicContentCreateTestShow =
  createContainer((params) => {
    const handles = {
      tests: Meteor.subscribe(
        'PublicTests',
        params.query,
        { limit: 10, skip: params.skip },
        { tags: true }
      ),
    };

    const data = {
      ready: _.mapValues(handles, h => h.ready()),
      tests: Fetch.General.tests().fetch(),
    };

    data.tags = data.tests
      && Fetch.General.tags(
        _.uniq(
          _.flatten(
            _.map(data.tests, 'tags')
          )
        )
      ).fetch();

    return data;
  }, PublicContentCreateTestShowView);

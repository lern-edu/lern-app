// Libs
import React from 'react';
import LinearProgress from 'material-ui';

// Views
import SchoolHomeToolbar from './Toolbar.jsx';
import SchoolHomeTutorial from './Tutorial.jsx';
import SchoolHomeOverview from './Overview.jsx';

SchoolHomeView = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    const user = Meteor.user();

    const handles = !_.get(user, 'profile.profile') ? {} : {
        tests: Meteor.subscribe('StudentTests', {}, { attempts: true }),
        plans: Meteor.subscribe('PublicPlans'),
        courses: Meteor.subscribe('StudentCourses'),
        posts: Meteor.subscribe('PublicPosts',
          { author: user._id }, { limit: 10, sort: { updatedAt: -1 } }, {}),
      };

    const data = {
      ready: _.mapValues(handles, h => h.ready()),
      posts: Fetch.General.posts().fetch(),
      plans: Fetch.General.plans().fetch(),
      courses: Fetch.General.courses().fetch(),
      tests: Fetch.General.tests().fetch(),
      user,
    };

    return data;
  },

  /* Render
  */

  render() {
    const { data: { ready, user: { profile: { tutorial } } } } = this;

    return (
      <div>
        <Layout.Bar title='Início' />
        <div>
        {!_.every(ready) ? <LinearProgress /> : _.get({
          true: <SchoolHomeTutorial {...this.text} key='tutorial'/>,
          false: <SchoolHomeOverview {...this.data} key='overview'/>,
        }, tutorial)}
        </div>
      </div>
    );
  },
});

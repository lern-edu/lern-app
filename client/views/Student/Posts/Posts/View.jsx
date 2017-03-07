import React from 'react';
import { AutoComplete, MenuItem, FloatingActionButton, FontIcon, LinearProgress } from 'material-ui';

StudentPostsView = React.createClass({
  mixins: [ReactMeteorData],

  /* Reactive Data Fetching
  */

  getMeteorData() {
    const userId = Meteor.user();
    const { query } = this.props;

    const handles = {
      subjects: Meteor.subscribe('PublicSubjects'),
      tags: Meteor.subscribe('PublicTags'),
      courses: Meteor.subscribe('StudentCourses'),
      posts: Meteor.subscribe('PublicPosts', query, { limit: 50 }, { author: true }),
    };

    const data = {
      ready: _.mapValues(handles, h => h.ready()),
      courses: Fetch.General.courses().fetch(),
      posts: Fetch.General.posts().fetch(),
      subjects: Fetch.General.subjects().fetch(),
      tags: Fetch.General.tags().fetch(),
      authors: Meteor.users.find().fetch(),
    };

    return data;
  },

  // Render

  render() {
    const { ready, courses, tags, subjects } = this.data;
    const { query } = this.props;
    return (
      <div className='ui container'>
        <Layout.Bar title='Comunidade acadêmica' />
        <StudentPostsToolbar {...this.data} {...this.props}/>
        {!_.every(ready) ? <LinearProgress /> :
        <StudentPostsList {...this.data} />}

        <div
          className='ui right aligned basic segment'
          style={{ position: 'fixed', bottom: '1em', right: '1em' }}>
          <FloatingActionButton

            href={FlowRouter.path('StudentPostCreate')}
            children={<FontIcon className='material-icons'>add</FontIcon>} />
        </div>
      </div>);
  },
});

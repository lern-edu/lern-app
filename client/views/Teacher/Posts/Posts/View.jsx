import React from 'react';
import { AutoComplete, MenuItem, FloatingActionButton, FontIcon } from 'material-ui';

TeacherPostsView = React.createClass({
  mixins: [ReactMeteorData],

  /* Reactive Data Fetching
  */

  getMeteorData() {
    const userId = Meteor.user();
    const { query } = this.props;

    const handles = {
      subjects: Meteor.subscribe('PublicSubjects'),
      tags: Meteor.subscribe('PublicTags'),
      courses: Meteor.subscribe('TeacherCourses'),
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
      <div>
        <Layout.Bar title='Comunidade acadêmica' />

        <div className='ui centered grid'>
          <div className='ten wide computer sixteen wide tablet column'>
            <TeacherPostsToolbar {...this.data} {...this.props}/>
            {!_.every(ready) ? <MUI.LinearProgress /> :
            <TeacherPostsList {...this.data} />}
          </div>
        </div>

        <div
          className='ui right aligned basic segment'
          style={{ position: 'fixed', bottom: '1em', right: '1em' }}>
          <FloatingActionButton
            
            href={FlowRouter.path('TeacherPostCreate')}
            children={<FontIcon className='material-icons'>add</FontIcon>} />
        </div>
      </div>);
  },
});

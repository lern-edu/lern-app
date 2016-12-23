import React from 'react';
import { AutoComplete, MenuItem, FloatingActionButton, FontIcon } from 'material-ui';

TeacherPostView = React.createClass({
  mixins: [ReactMeteorData],

  /* Reactive Data Fetching
  */

  getMeteorData() {
    const userId = Meteor.user();
    const { postId: _id } = this.props;

    const handles = {
      post: Meteor.subscribe('PublicPosts', { _id }, {},
        { author: true, tags: true, subjects: true, images: true, documents: true }),
    };

    const data = {
      ready: _.mapValues(handles, h => h.ready()),
      post: _.first(Fetch.General.posts().fetch()),
    };

    data.subjects = data.post && !_.isEmpty(data.post.subjects) && data.post.findSubjects().fetch();
    data.tags = data.post && !_.isEmpty(data.post.tags) && data.post.findTags().fetch();
    data.images = data.post && !_.isEmpty(data.post.images) && data.post.findImages().fetch();
    data.documents = data.post && !_.isEmpty(data.post.documents) &&
      data.post.findDocuments().fetch();
    data.author = data.post && data.post.author && _.first(data.post.findAuthor().fetch());

    return data;
  },

  // Render

  render() {
    const { ready, post } = this.data;
    return (
      <div>
        <Layout.Bar
          title={_.get(post, 'title')}
          crumbs={[
            { label: 'Comunidade Acadêmica', path: 'TeacherPosts' },
          ]} />
          <div className='ui centered grid'>
            <div className='ten wide computer sixteen wide tablet column'>
            {!_.every(ready) ? <MUI.LinearProgress /> : <TeacherPostCard {...this.data} />}
            </div>
          </div>

      </div>);
  },
});

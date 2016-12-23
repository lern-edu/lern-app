import React from 'react';

StudentPostEditView = React.createClass({
  mixins: [ReactMeteorData],

  // Reactive data

  getMeteorData() {
    const userId = Meteor.userId();
    const { postId } = this.props;

    const handles = {
      subjects: Meteor.subscribe('PublicSubjects'),
      tags: Meteor.subscribe('PublicTags'),
      courses: Meteor.subscribe('StudentCourses'),
      post: Meteor.subscribe('PublicPosts', postId, { limit: 1 },
        { images: true, documents: true }),
    };

    const data = {
      ready: _.mapValues(handles, h => h.ready()),
      subjects: Fetch.Public().subjects().fetch(),
      tags: Fetch.Public().tags().fetch(),
      courses:Fetch.General.courses().fetch(),
      post: _.first(Fetch.General.posts(postId).fetch()),
    };

    data.images = data.post && data.post.images && data.post.findImages().fetch();
    data.documents = data.post && data.post.documents && data.post.findDocuments().fetch();

    return data;
  },

  // Render

  render() {
    const { ready: { courses, tags, subjects }, images, post } = this.data;
    return (
      <div className='ui container'>

        <Layout.Bar
          title='Editar Post'
          crumbs={[
            { label: 'Comunidade Acadêmica', path: 'StudentPosts' },
          ]} />

        {courses && tags && subjects ? <StudentPostEditForm
            {...this.data} {...this.props} doc={post}/> :
          <MUI.LinearProgress />}

      </div>
    );
  },
});

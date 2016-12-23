import React from 'react';

TeacherPostCreateView = React.createClass({
  mixins: [ReactMeteorData],

  /* Reactive Data Fetching
  */

  getMeteorData() {
    const userId = Meteor.userId();
    const { course, subjectsIds: subject } = this.props;
    const imageIds = Session.get('images');
    const documentsIds = Session.get('documents');

    const handles = {
      subjects: Meteor.subscribe('PublicSubjects'),
      tags: Meteor.subscribe('PublicTags'),
      images: Meteor.subscribe('PublicImages', imageIds),
      documents: Meteor.subscribe('PublicDocuments', documentsIds),
      courses: Meteor.subscribe('TeacherCourses'),
    };

    const data = {
      ready: _.mapValues(handles, h => h.ready()),
      images: Fetch.General.images().fetch(),
      documents: Fetch.General.documents().fetch(),
      courses: Fetch.General.courses().fetch(),
    };

    data.subjects = _.isEmpty(course) ? Fetch.Public().subjects().fetch() : (
      !data.ready.courses ? undefined : _.find(data.courses,
        { _id: course }).findSubjects().fetch());
    data.tags = _.isEmpty(course) ? Fetch.General.tags().fetch() : (
      !data.ready.courses ? undefined : _.find(data.courses,
        { _id: course }).findTags().fetch());

    return data;
  },

  /* Render
  */

  render() {
    const { ready: { courses, tags, subjects }, images } = this.data;

    return (
      <div className='ui container'>

        <Layout.Bar
          title='Novo Post'
          crumbs={[
            { label: 'Comunidade Acadêmica', path: 'TeacherPosts' },
          ]} />

        {courses && tags && subjects ? <TeacherPostCreateForm {...this.data} {...this.props} /> :
          <MUI.LinearProgress />}

      </div>
    );
  },
});

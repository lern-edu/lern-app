import React from 'react';

TeacherQuestionsView = React.createClass({
  mixins: [ReactMeteorData],

  /* Reactive Data Fetching
  */

  getMeteorData() {
    const userId = Meteor.userId();

    const handles = {
      questions: Meteor.subscribe('TeacherQuestions', { own: true }),
      subjects: Meteor.subscribe('PublicSubjects'),
    };

    return {
      ready: _.mapValues(handles, h => h.ready()),
      questions: Fetch.Teacher(userId).questions().fetch(),
      subjects: Fetch.Public().subjects().fetch(),
    };
  },

  /* Render
  */

  render() {
    return (
      <div className='ui container'>

        <Layout.Bar title='Minhas questões' />

        <TeacherQuestionsGallery {...this.data} />

        <TeacherQuestionsToolbar />

      </div>
    );
  },
});

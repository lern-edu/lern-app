import React from 'react';

TeacherQuestionCreateView = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    const userId = Meteor.userId();

    const handles = {
      subjects: Meteor.subscribe('PublicSubjects'),
      tags: Meteor.subscribe('PublicTags'),
    };

    return {
      user: Meteor.user(),
      ready: _.mapValues(handles, h => h.ready()),
      subjects: Fetch.Public().subjects().fetch(),
      tags: Fetch.Public().tags().fetch(),
    };
  },

  render() {

    return (
      <div className='ui container'>
        <Layout.Bar
          title='Criar questão'
          crumbs={[
            { label: 'Minhas questões', path: 'TeacherQuestions' },
          ]} />
        <TeacherQuestionCreateForm {...this.data} restore={this.props.query} />
      </div>
    );
  },
});

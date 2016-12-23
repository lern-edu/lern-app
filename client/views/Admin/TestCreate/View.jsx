import React from 'react';

AdminTestCreateView = React.createClass({
  mixins: [ReactMeteorData],

  /* Reactive Data Fetching
  */

  getMeteorData() {
    const userId = Meteor.userId();
    const subject = Session.get('searchSubject') || null;
    const text = Session.get('searchText') || null;
    const tags = Session.get('searchTags') || null;

    const handles = {
      questions: Meteor.subscribe('PublicQuestionsText', { subject, text, tags }, { limit: 51 }),
      subjects: Meteor.subscribe('PublicSubjects'),
      tags: Meteor.subscribe('PublicTags'),
      courses: Meteor.subscribe('AdminSchoolCourses'),
      users: Meteor.subscribe('AdminUsers'),
    };

    const data = {
      ready: _.mapValues(handles, h => h.ready()),
      subjects: Fetch.Public().subjects().fetch(),
      tags: Fetch.Public().tags().fetch(),
      courses: Fetch.General.courses().fetch(),
      users: Fetch.General.users().fetch(),
      questions: Fetch.General.questions().fetch(),
    };

    data.images = data.questions && Fetch.General.images().fetch();

    return data;
  },

  /* Render
  */

  render() {
    return (
      <div className='ui container'>

        <div>
          <Layout.Bar
            title='Nova Prova'
            crumbs={[
              { label: 'Provas', path: 'AdminTests' },
            ]} />
          <AdminTestCreateForm {...this.data} />
        </div>

      </div>
    );
  },
});

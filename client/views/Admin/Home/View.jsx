import React from 'react';

AdminHomeView = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    const handles = {
      subjects: Meteor.subscribe('PublicSubjects'),
      tags: Meteor.subscribe('PublicTags'),
      users: Meteor.subscribe('AdminUsers'),
      courses: Meteor.subscribe('AdminCourses'),
    };

    return {
      ready: _.mapValues(handles, h => h.ready()),
      subjects: Fetch.Public().subjects().fetch(),
      tags: Fetch.Public().tags().fetch(),
      users: Fetch.General.users().fetch(),
      courses: Fetch.General.courses().fetch(),
    };
  },

  render() {
    const { active='subjects' } = this.props;

    return (
      <div className='ui container'>

        <Layout.Bar title='Home' />

        <AdminHomeMenu active={active} />

        {_.get({
          subjects: <AdminHomeSubjects {...this.data} key='subjects'/>,
          users: <AdminHomeUsers {...this.data} key='users' />,
        }, active)}

      </div>

    );
  },

});

import React from 'react';

AdminSchoolsView = React.createClass({
  mixins: [ReactMeteorData],

  /* Reactive Data Fetching
  */

  getMeteorData() {
    const userId = Meteor.userId();

    const handles = {
      subjects: Meteor.subscribe('PublicSubjects'),
      schools: Meteor.subscribe('AdminUsers', { roles: 'school' }),
      courses: Meteor.subscribe('AdminCourses'),
    };

    const data = {
      ready: _.mapValues(handles, h => h.ready()),
      subjects: Fetch.Public().subjects().fetch(),
      schools: Meteor.users.find({ roles: 'school' }).fetch(),
      courses: Fetch.General.courses().fetch(),
    };

    return data;
  },

  /* Render
  */

  render() {
    const { ready, schools } = this.data;

    return (
      <div className='ui container'>

        <Layout.Bar title='Escolas' />

        {!_.every(ready) ? <MUI.LinearProgress/> : [
          <AdminSchoolsToolbar key='toolbar' {...this.data}/>,
          <AdminSchoolsList key='list' {...this.data}/>,
        ]}

      </div>
    );
  },
});

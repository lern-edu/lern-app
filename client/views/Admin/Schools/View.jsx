// Libs
import React from 'react';
import { LinearProgress } from 'material-ui';

// Views
import AdminSchoolsList from './List.jsx';
import AdminSchoolsToolbar from './Toolbar.jsx';

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

        {!_.every(ready) ? <LinearProgress/> : [
          <AdminSchoolsToolbar key='toolbar' {...this.data}/>,
          <AdminSchoolsList key='list' {...this.data}/>,
        ]}

      </div>
    );
  },
});

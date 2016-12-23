import React from 'react';
import { LinearProgress } from 'material-ui';

TeacherSettingsView = React.createClass({
  mixins: [ReactMeteorData],

  /* Reactive Data Fetching
  */

  getMeteorData() {
    const handles = {
      schools: Meteor.subscribe('UserSchools'),
      courses: Meteor.subscribe('TeacherCourses', {},
        { subjects: true, tags: true }),
    };

    const userId = Meteor.userId();

    return {
      ready: _.mapValues(handles, h => h.ready()),
      schools: Fetch.General.users({ roles: 'school' }).fetch(),
      ready: _.mapValues(handles, h => h.ready()),
      subjects: Fetch.Public().subjects().fetch(),
      tags: Fetch.Public().tags().fetch(),
      courses: Fetch.Teacher(userId).courses().fetch(),
    };
  },

  /* Get Context
  */

  contextTypes: {
    user: React.PropTypes.object,
  },

  /* Render
  */

  render() {
    const { ready } = this.data;
    const { tab='profile' } = this.props;
    const { user } = this.context;
    return (
      <div>

        <Layout.Bar title='Ajustes' />

        <div className='ui centered grid'>
          <div className='ten wide computer sixteen wide tablet column'>
            <TeacherSettingsTabs tab={tab}/>

            {!_.every(ready) ? <LinearProgress /> : {
                profile: <TeacherSettingsProfile {...this.data} key='profile'/>,
                security: <TeacherSettingsSecurity key='security'/>,
                classes: <teacherSettingsClasses key='classes' />,
              }[tab]
            }
          </div>
        </div>
      </div>
    );
  },

});

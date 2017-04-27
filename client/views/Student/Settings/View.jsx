import React from 'react';
import { LinearProgress } from 'material-ui';

StudentSettingsView = React.createClass({
  mixins: [ReactMeteorData],

  /* Reactive Data Fetching
  */

  getMeteorData() {
    const handles = {
      schools: Meteor.subscribe('UserSchools'),
      plans: Meteor.subscribe('PublicPlans'),
      subjects: Meteor.subscribe('PublicSubjects'),
    };

    return {
      ready: _.mapValues(handles, h => h.ready()),
      schools: Fetch.General.users({ roles: 'school' }).fetch(),
      plans: Fetch.General.plans().fetch(),
      subjects: Fetch.Public().subjects().fetch(),
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
    const { ready, schools } = this.data;
    const { tab='course' } = this.props;
    const { user } = this.context;
    return (
      <div>

        <Layout.Bar title='Configurações' />

        <StudentSettingsTabs tab={tab}/>

        <div className='ui container' style={{ marginTop: 10 }} >
          {
            !_.every(ready)
            ? <LinearProgress />
            : {
              profile: <StudentSettingsProfile key='profile' {...this.data} schools={schools}/>,
              study: <StudentSettingsStudy key='study' {...this.data} user={user}/>,
              security: <StudentSettingsSecurity key='security'/>,
              course: <StudentSettingsCourse user={user} key='course'/>,
            }[tab]
          }
        </div>

      </div>
    );
  },
});

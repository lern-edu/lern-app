import React from 'react';
import { LinearProgress } from 'material-ui';

const TeacherSettingsView = React.createClass({

  /* Get Context
  */

  contextTypes: {
    user: React.PropTypes.object,
  },

  /* Render
  */

  render() {
    const { ready, tab='profile' } = this.props;
    const { user } = this.context;
    return (
      <div>

        <Layout.Bar title='Ajustes' />

        <TeacherSettingsTabs tab={tab}/>

        <div className='ui container' style={{ marginTop: 10 }} >
          {
            !_.every(ready)
            ? <LinearProgress />
            : {
              profile: <TeacherSettingsProfile {...this.props} key='profile'/>,
              security: <TeacherSettingsSecurity key='security'/>,
            }[tab]
          }
        </div>

      </div>
    );
  },

});

export default TeacherSettingsView;

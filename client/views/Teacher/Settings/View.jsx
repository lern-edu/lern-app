import React from 'react';
import { LinearProgress } from 'material-ui';

//Views
import TeacherSettingsTabs from './Tabs.jsx';
import TeacherSettingsClasses from './Classes.jsx';
import TeacherSettingsProfile from './Profile.jsx';
import TeacherSettingsSecurity from './Security.jsx';

const TeacherSettingsView = React.createClass({

  /* Get Context
  */

  contextTypes: {
    user: React.PropTypes.object,
  },

  /* Render
  */

  render() {
    const ready = this.data;
    const { tab='profile' } = this.props;
    const { user } = this.context;
    return (
      <div>

        <Layout.Bar title='Ajustes' zDepth= {0} />

        <div className='ui centered grid'>
          <div className='sixteen wide column'>
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
export default TeacherSettingsView;

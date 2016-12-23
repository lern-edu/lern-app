import React from 'react';
import { Tabs, Tab } from 'material-ui';

TeacherSettingsTabs = React.createClass({
  tabs: {
    profile: 'Perfil',
    security: 'Segurança',
    classes: 'Turmas'
  },

  /* Handlers
  */

  handleChange(tab) {
    FlowRouter.setQueryParams({ tab });
  },

  /* Render
  */

  render() {
    const { tab } = this.props;
    return (
      <Tabs value={tab} onChange={this.handleChange}>
        {_.map(this.tabs, (v, k) =>
          <Tab value={k} label={v} key={k}/>
        )}
      </Tabs>
    );
  },
});

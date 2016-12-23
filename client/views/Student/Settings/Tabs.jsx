import React from 'react';
import { Tabs, Tab } from 'material-ui';

StudentSettingsTabs = React.createClass({
  tabs: {
    //profile: 'Perfil',
    study: 'Estudos',
    security: 'Segurança',
    course: 'Curso',
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

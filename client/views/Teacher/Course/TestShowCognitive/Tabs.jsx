import React from 'react';
import { Tabs, Tab } from 'material-ui';

TeacherTestShowCognitiveTabs = React.createClass({

  tabs: {
    attempts: 'Tentativas',
    info: 'Informações',
  },

  // Handlers

  handleTabChange(tab) {
    FlowRouter.setQueryParams({ tab });
  },

  // Render

  render() {
    const { props: { tab }, tabs } = this;
    return (
      <Tabs value={tab} onChange={this.handleTabChange}>
        {_.map(tabs, (label, key) =>
          <Tab key={key} value={key} label={label} />)}
      </Tabs>
    );
  },

});

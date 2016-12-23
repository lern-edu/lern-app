import React from 'react';
import { Tabs, Tab } from 'material-ui';

TeacherCourseShowMenu = React.createClass({
  //  static data

  tabs: {
    lectures: 'Aulas',
    tests: 'Atividades',
    grades: 'Notas',
    diary: 'Diário',
    reports: 'Relatório',
    posts: 'Blog',
  },

  /* Handlers
  */

  handleTabChange(active) {
    FlowRouter.setQueryParams({ active });
  },

  /* Render
  */

  render() {
    const { props: { active }, tabs } = this;

    return (
      <Tabs value={active} onChange={this.handleTabChange}>
        {_.map(_.keys(tabs), key =>
          <Tab key={key} value={key} label={_.get(tabs, key)} />)}
      </Tabs>
    );
  },
});

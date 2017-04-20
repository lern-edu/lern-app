import React from 'react';
import { Tabs, Tab } from 'material-ui';

const TeacherCourseShowMenu = React.createClass({
  //  static data

  tabs: {
    lectures: 'Aulas',
    tests: 'Atividades',
    // grades: 'Notas',
    // diary: 'Diário',
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
    let { active='lectures' } = this.props;

    return (
      <Tabs value={active} onChange={this.handleTabChange}>
        {
          _.map(this.tabs, (value, key) =>
            <Tab key={key} value={key} label={value} />
          )
        }
      </Tabs>
    );
  },
});

export default TeacherCourseShowMenu;

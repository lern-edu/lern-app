import React from 'react';
import { Tabs, Tab } from 'material-ui';

const TeacherCourseShowMenu = React.createClass({
  //  static data

  tabs: {
    home: 'Home',
    lectures: 'Aulas',
    tests: 'Atividades',
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
    let { active='home' } = this.props;

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

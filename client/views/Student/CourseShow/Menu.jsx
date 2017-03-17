import React from 'react';
import { Tabs, Tab } from 'material-ui';

const StudentCourseShowMenu = React.createClass({
  //  static data

  tabs: {
    home: 'Inicio',
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
    const { props: { active, lectures, tests }, tabs } = this;

    return (
      <Tabs value={active} onChange={this.handleTabChange}>
        <Tab key='home' value='home' label='Início' />
        {
          _.isEmpty(tests) ? undefined
          : <Tab key='tests' value='tests' label='Testes' />
        }
        {
          _.isEmpty(lectures) ? undefined
          : <Tab key='lectures' value='lectures' label='Aulas' />
        }
        <Tab key='blog' value='blog' label='Blog' />
      </Tabs>
    );
  },
});

export default StudentCourseShowMenu;

import React from 'react';
import { Tabs, Tab, FontIcon } from 'material-ui';

AdminHomeMenu = React.createClass({
  items: {
    subjects: {
      icon: <FontIcon className='material-icons' >list</FontIcon>,
      name: 'Matérias + Tags',
    },
    users: {
      icon: <FontIcon className='material-icons' >person</FontIcon>,
      name: 'Usuários',
    },
  },

  /* Handlers
  */

  handleItemClick({ props: { value: active } }) {
    FlowRouter.setQueryParams({ active });
  },

  /* Render
  */

  render() {
    const { active } = this.props;

    return (
      <Tabs value={active} >
        {_.map(this.items, (v, k) =>
          <Tab label={v.name} value={k} key={k} icon={v.icon} onActive={this.handleItemClick} />)}
      </Tabs>
    );
  },
});

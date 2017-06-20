import React from 'react';
import { Tabs, Tab, FontIcon } from 'material-ui';

const items = {
  subjects: {
    icon: <FontIcon className='material-icons' >list</FontIcon>,
    name: 'Matérias + Tags',
  },
  users: {
    icon: <FontIcon className='material-icons' >person</FontIcon>,
    name: 'Usuários',
  },
};

export default class AdminHomeMenu extends React.Component {

  /* Handlers
  */

  handleItemClick({ props: { value: active } }) {
    FlowRouter.setQueryParams({ active });
  }

  /* Render
  */

  render() {
    const { active } = this.props;

    return (
      <Tabs value={active} >
        {
          _.map(items, (v, k) =>
            <Tab
              label={v.name}
              value={k}
              key={k}
              icon={v.icon}
              onActive={this.handleItemClick}
            />
          )
        }
      </Tabs>
    );
  }

};

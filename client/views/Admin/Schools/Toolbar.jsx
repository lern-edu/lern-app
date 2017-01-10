import React from 'react';
import { Toolbar, ToolbarSeparator, ToolbarTitle, ToolbarGroup, RaisedButton } from 'material-ui';

const AdminSchoolsToolbar = React.createClass({
  render() {
    const { schools } = this.props;

    return (
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text={`${schools.length} items`} />
        </ToolbarGroup>
        <ToolbarGroup lastChild={true} >
          <ToolbarTitle text='Escolas' />
          <ToolbarSeparator/>
          <RaisedButton
            label='Novo'
            primary={true}
            style={{ textAlign: 'center' }}
            href={FlowRouter.path('AdminUserCreate')} />
        </ToolbarGroup>
      </Toolbar>
    );
  },
});

export default AdminSchoolsToolbar;

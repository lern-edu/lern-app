import React from 'react';
import { Toolbar, ToolbarSeparator, ToolbarTitle, ToolbarGroup, RaisedButton } from 'material-ui';

const AdminPlansToolbar = React.createClass({
  render() {
    const { plans } = this.props;

    return (
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text={`${plans.length} items`} />
        </ToolbarGroup>
        <ToolbarGroup lastChild={true} >
          <ToolbarTitle text='Planos' />
          <ToolbarSeparator/>
          <RaisedButton
            label='Novo'
            primary={true}
            style={{ textAlign: 'center' }}
            href={FlowRouter.path('AdminPlanCreate')} />
        </ToolbarGroup>
      </Toolbar>
    );
  },
});

export default AdminPlansToolbar;

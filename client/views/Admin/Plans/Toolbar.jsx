import React from 'react';
import { Toolbar, ToolbarSeparator, ToolbarTitle, ToolbarGroup, RaisedButton } from 'material-ui';

AdminPlansToolbar = React.createClass({
  render() {
    const { plans } = this.props;

    return (
      <Toolbar>
        <ToolbarGroup float='left'>
          <ToolbarTitle text={`${plans.length} items`}/>
        </ToolbarGroup>
        <ToolbarGroup float='right'>
          <ToolbarTitle text='Planos'/>
          <ToolbarSeparator/>
          <RaisedButton
            label='Novo'
            primary={true}
            
            style={{ textAlign: 'center' }}
            href={FlowRouter.path('AdminPlanCreate')}
          />
        </ToolbarGroup>
      </Toolbar>
    );
  },
});

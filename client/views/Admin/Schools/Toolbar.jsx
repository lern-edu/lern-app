import React from 'react';
import { Toolbar, ToolbarSeparator, ToolbarTitle, ToolbarGroup, RaisedButton } from 'material-ui';

AdminSchoolsToolbar = React.createClass({
  render() {
    const { schools } = this.props;

    return (
      <Toolbar>
        <ToolbarGroup float='left'>
          <ToolbarTitle text={`${schools.length} items`}/>
        </ToolbarGroup>
        <ToolbarGroup float='right'>
          <ToolbarTitle text='Escolas'/>
          <ToolbarSeparator/>
          <RaisedButton
            label='Novo'
            primary={true}
            
            style={{ textAlign: 'center' }}
            href={FlowRouter.path('AdminUserCreate')}
          />
        </ToolbarGroup>
      </Toolbar>
    );
  },
});

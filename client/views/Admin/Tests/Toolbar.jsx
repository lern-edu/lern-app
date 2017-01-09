import React from 'react';
import { Toolbar, ToolbarSeparator, ToolbarTitle, ToolbarGroup, RaisedButton } from 'material-ui';

AdminTestsToolbar = React.createClass({
  render() {
    const { tests } = this.props;

    return (
      <Toolbar>
        <ToolbarGroup float='left'>
          <ToolbarTitle text={`${tests.length} items`}/>
        </ToolbarGroup>
        <ToolbarGroup float='right'>
          <ToolbarTitle text='Prova'/>
          <ToolbarSeparator/>
          <RaisedButton
            label='Novo'
            primary={true}
            
            style={{ textAlign: 'center' }}
            href={FlowRouter.path('AdminTestCreate')}
          />
        </ToolbarGroup>
      </Toolbar>
    );
  },
});

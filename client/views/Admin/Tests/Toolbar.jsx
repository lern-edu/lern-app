import React from 'react';
import { Toolbar, ToolbarSeparator, ToolbarTitle, ToolbarGroup, RaisedButton } from 'material-ui';

export default class AdminTestsToolbar extends React.Component {

  render() {
    const { tests } = this.props;

    return (
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text={`${tests.length} items`} />
        </ToolbarGroup>
        <ToolbarGroup lastChild={true} >
          <ToolbarTitle text='Prova' />
          <ToolbarSeparator/>
          <RaisedButton
            label='Novo'
            secondary={true}
            style={{ textAlign: 'center' }}
            href={FlowRouter.path('AdminTestCreate')} />
        </ToolbarGroup>
      </Toolbar>
    );
  }

};

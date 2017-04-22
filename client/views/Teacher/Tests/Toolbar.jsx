import React from 'react';
import { Toolbar, ToolbarSeparator, ToolbarTitle, ToolbarGroup, RaisedButton } from 'material-ui';

const TeacherTestsToolbar = React.createClass({
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
            href={FlowRouter.path('TeacherTestCreate')} />
        </ToolbarGroup>
      </Toolbar>
    );
  },
});

export default TeacherTestsToolbar;

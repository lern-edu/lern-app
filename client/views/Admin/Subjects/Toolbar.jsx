import React from 'react';
import { Toolbar, ToolbarSeparator, ToolbarTitle, ToolbarGroup, RaisedButton, } from 'material-ui';

const AdminSubjectsToolbar = React.createClass({
  render() {
    const { subjects } = this.props;

    return (
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text={`${subjects.length} items`} />
        </ToolbarGroup>
        <ToolbarGroup lastChild={true} >
          <ToolbarTitle text='Matéria' />
          <ToolbarSeparator/>
          <RaisedButton
            label='Nova'
            primary={true}
            style={{ textAlign: 'center' }}
            href={FlowRouter.path('AdminSubjectCreate')}
          />
        </ToolbarGroup>
      </Toolbar>
    );
  },
});

export default AdminSubjectsToolbar;

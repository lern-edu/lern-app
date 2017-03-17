import React from 'react';
import { Toolbar, ToolbarSeparator, ToolbarTitle, ToolbarGroup, RaisedButton, } from 'material-ui';

const AdminContentToolbar = React.createClass({
  render() {
    const { tags, subjects } = this.props;

    return (
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text={`${subjects.length} Matérias e ${tags.length} Tags`} />
        </ToolbarGroup>
        <ToolbarGroup lastChild={true} >
          <ToolbarTitle text='Questões' />
          <ToolbarSeparator/>
          <RaisedButton
            label='Nova'
            secondary={true}
            style={{ textAlign: 'center' }}
            href={FlowRouter.path('AdminQuestionCreate', {}, {})} />
        </ToolbarGroup>
      </Toolbar>
    );
  },
});

export default AdminContentToolbar;

// Libs
import React from 'react';
import { Toolbar, ToolbarSeparator, ToolbarTitle, ToolbarGroup, RaisedButton } from 'material-ui';

const AdminSubjectsTagsToolbar = React.createClass({

  // Handlers

  handleCreateTag() {
    const { parent } = this.props;
    parent.setState({ createTag: true });
  },

  /* Render
  */

  render() {
    const { tags } = this.props;

    return (
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text={`${tags.length} items`} />
        </ToolbarGroup>
        <ToolbarGroup lastChild={true} >
          <ToolbarTitle text='Tags' />
          <ToolbarSeparator/>
          <RaisedButton
            label='Nova'
            primary={true}
            style={{ textAlign: 'center' }}
            onTouchTap={this.handleCreateTag}
          />
        </ToolbarGroup>
      </Toolbar>
    );
  },
});

export default AdminSubjectsTagsToolbar;

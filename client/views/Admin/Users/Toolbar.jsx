import React from 'react';
import { Toolbar, ToolbarGroup, TextField, } from 'material-ui';

const AdminUsersToolbar = React.createClass({

  // Render

  render() {
    return (
      <Toolbar>
        <div className='ui two column grid'>
          <ToolbarGroup className='sixteen wide column'>
            <TextField
              hintText='Pesquisar'
              fullWidth={true}
              onChange={this.props.update} />
          </ToolbarGroup>
        </div>
      </Toolbar>
    );
  },
});

export default AdminUsersToolbar;

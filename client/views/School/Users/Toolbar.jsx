import React from 'react';
import { Toolbar, ToolbarGroup, TextField, } from 'material-ui';

const SchoolUsersToolbar = React.createClass({

  // Render

  render() {
    return (
      <Toolbar>
        <div className='ui two column grid'>
          <ToolbarGroup className='sixteen wide column'>
            <TextField
              hintText='Pesquisar'
              fullWidth={true} />
          </ToolbarGroup>
        </div>
      </Toolbar>
    );
  },
});

export default SchoolUsersToolbar;

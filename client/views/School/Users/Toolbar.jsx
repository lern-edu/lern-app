import React from 'react';
import { Toolbar, ToolbarGroup, TextField, } from 'material-ui';

const SchoolUsersToolbar = React.createClass({

  // Handlers

  handleName(event, name) {
    const { parent } = this.props;
    parent.setState({ name });
  },

  // Render

  render() {
    return (
      <Toolbar>
        <div className='ui two column grid'>
          <ToolbarGroup className='sixteen wide column'>
            <TextField
              onChange={this.handleName}
              hintText='Pesquisar'
              fullWidth={true}
            />
          </ToolbarGroup>
        </div>
      </Toolbar>
    );
  },
});

export default SchoolUsersToolbar;

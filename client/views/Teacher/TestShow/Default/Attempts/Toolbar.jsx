import React from 'react';
import { Toolbar, ToolbarSeparator, ToolbarTitle, ToolbarGroup, } from 'material-ui';
import { DropDownMenu, MenuItem, IconButton, FontIcon, } from 'material-ui';

TeacherTestShowDefaultToolbar = React.createClass({

  // Static data

  options: {
    all: 'Todos',
    finished: 'Terminados',
    running: 'Em andamento',
    corrected: 'Corrigidos',
  },

  // Handlers

  handleFilterChange(event, index, filter) {
    FlowRouter.setQueryParams({ filter });
  },

  handleExport() {
    this.props.parent.setState({ open: true });
  },

  // Render

  render() {
    const { options, props: { value } } = this;
    return (
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text='Tentativas'/>
        </ToolbarGroup>
        <ToolbarGroup lastChild={true} >
          <ToolbarTitle text='Filtrar'/>
          <ToolbarSeparator/>
          <DropDownMenu
            value={value}
            style={{ marginLeft: '1em' }}
            onChange={this.handleFilterChange}
          >
            {
              _.map(options, (label, key) =>
                <MenuItem key={key} value={key} primaryText={label}/>
              )
            }
          </DropDownMenu>
        </ToolbarGroup>
      </Toolbar>
    );
  },
});

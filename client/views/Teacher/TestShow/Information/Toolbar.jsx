import React from 'react';
import { Toolbar, ToolbarSeparator, ToolbarTitle, ToolbarGroup, DropDownMenu, MenuItem, Checkbox, FontIcon, } from 'material-ui';

TeacherTestShowMetricsToolbar = React.createClass({

  // Handlers

  handleInfosChange(event, index, infosFilter) {
    FlowRouter.setQueryParams({ infosFilter });
  },

  handleAttemptsChange(event, index, attemptsFilter) {
    FlowRouter.setQueryParams({ attemptsFilter });
  },

  handleViewChange(event, chart) {
    FlowRouter.setQueryParams({ chart });
  },

  // Render

  render() {
    const { props: { attemptsFilter, infosFilter, chart,
      options: { attempts, infos }, }, } = this;

    return (
      <Toolbar>
        <ToolbarGroup float='left'>

          <DropDownMenu
            value={infosFilter}
            style={{ marginLeft: '1em' }}
            onChange={this.handleInfosChange}>
            {_.map(infos, ({ label }, key) =>
              <MenuItem key={key} value={key} primaryText={label}/>)}
          </DropDownMenu>

          <ToolbarSeparator/>

          <DropDownMenu
            value={attemptsFilter}
            style={{ marginLeft: '1em' }}
            onChange={this.handleAttemptsChange}>
            {_.map(attempts, ({ label }, key) =>
              <MenuItem key={key} value={key} primaryText={label}/>)}
          </DropDownMenu>

        </ToolbarGroup>

        <ToolbarGroup float='right'>

          {/*<Checkbox
            label='Gráfico'
            checked={JSON.parse(chart)}
            style={{ marginTop: '16px' }}
            onCheck={this.handleViewChange}/>*/}

        </ToolbarGroup>
      </Toolbar>
    );
  },
});

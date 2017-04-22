// libs
import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';

import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';

const TeacherTestShowByTagsTableChartToolbar = React.createClass({

  // Handlers

  handleDataType(event, index, dataType) {
    const { parent } = this.props;
    parent.setState({ dataType });
    parent.callFunction(null, dataType);
  },

  /* Render
  */

  render() {
    const { dataType, avaregeTags } = this.props;

    return (
      <Toolbar>
        <ToolbarGroup firstChild={true}>
          <DropDownMenu value={dataType} onChange={this.handleDataType}>
            <MenuItem value='overall' primaryText='Geral' />
            <MenuItem value='compare' primaryText='Comparar' />
          </DropDownMenu>
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarTitle text='Média' />
          <ToolbarSeparator />
          <ToolbarTitle style={{ marginLeft: 5 }} text={
            numeral(
              _.mean(avaregeTags)
              || 0
            ).format('0.0')
          } />
        </ToolbarGroup>
      </Toolbar>
    );
  },
});

export default TeacherTestShowByTagsTableChartToolbar;

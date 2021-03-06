// libs
import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle, RaisedButton } from 'material-ui';

const TeacherTestShowByTagsTableChartToolbar = React.createClass({

  // Handlers

  handleDataType(event, index, dataType) {
    const { parent } = this.props;
    parent.setState({ dataType });
    parent.callFunction(null, dataType);
  },

  handleUpdate() {
    const { parent } = this.props;
    parent.callFunction();
  },

  /* Render
  */

  render() {
    const { dataType, avaregeTags } = this.props;
    const { parent: { state: { innerWidth } } } = this.props;

    return (
      <Toolbar>
        <ToolbarGroup firstChild={true}>
          <RaisedButton
            label='Atualizar'
            secondary={true}
            onTouchTap={this.handleUpdate}
          />
          <ToolbarSeparator />
          <DropDownMenu value={dataType} onChange={this.handleDataType}>
            <MenuItem value='overall' primaryText='Geral' />
            <MenuItem value='compare' primaryText='Comparar' />
          </DropDownMenu>
        </ToolbarGroup>
        {
          innerWidth < 769
          ? undefined
          : <ToolbarGroup>
            <ToolbarTitle text='Média' />
            <ToolbarSeparator />
            <ToolbarTitle style={{ marginLeft: 5 }} text={
              numeral(
                _.mean(avaregeTags)
                || 0
              ).format('0.0')
            } />
          </ToolbarGroup>
        }
      </Toolbar>
    );
  },
});

export default TeacherTestShowByTagsTableChartToolbar;

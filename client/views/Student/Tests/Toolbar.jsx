import React from 'react';
import { Toolbar, ToolbarGroup, ToolbarTitle, ToolbarSeparator } from 'material-ui';
import { DropDownMenu, MenuItem } from 'material-ui';
import { RaisedButton } from 'material-ui';

StudentTestsToolbar = React.createClass({

  states: {
    todo: 'Pendentes',
    done: 'Terminadas',
    sched: 'Agendadas',
  },

  /* Handlers
  */

  handleDropdownChange(event, index, value) {
    FlowRouter.setQueryParams({ active: value });
  },

  /* Render
  */

  render() {
    const { active } = this.props;

    return (
      <Toolbar>
        <ToolbarGroup firstChild={true} float='left'>
          <ToolbarTitle text='Meus Treinos' style={{ marginLeft: 30 }}/>
        </ToolbarGroup>
        <ToolbarGroup lastChild={true} float='right'>
          <DropDownMenu value={active} onChange={this.handleDropdownChange}>
            {_.map(this.states, (v, k) =>
              <MenuItem value={k} primaryText={v} key={k} />
            )}
          </DropDownMenu>
          {/*<ToolbarSeparator />*/}
          <RaisedButton
            style={{ textAlign: 'center' }}
            href={FlowRouter.path('StudentTestCreate')}
            linkButton={true}
            label='Novo'
            primary={true}
          />
        </ToolbarGroup>
      </Toolbar>
    );
  },
});

import React from 'react';
import { DropDownMenu, MenuItem } from 'material-ui';
import { Toolbar, ToolbarGroup, ToolbarTitle, ToolbarSeparator } from 'material-ui';

StudentReportsToolbar = React.createClass({
  componentDidMount() {
    const { subjects, subjectId, parent } = this.props;
    if (!subjectId)
      parent.handleSubjectChange(undefined, undefined, _.get(_.first(subjects), '_id'));
  },

  render() {
    const { subjects, subjectId, parent } = this.props;

    return (
      <Toolbar>
        <ToolbarGroup firstChild={true} style={{ float: 'left' }}>
          <DropDownMenu value={subjectId} onChange={parent.handleSubjectChange}>
            {_.map(subjects, subject =>
              <MenuItem
                value={subject._id}
                key={subject._id}
                primaryText={subject.name}
              />
            )}
          </DropDownMenu>
        </ToolbarGroup>
        <ToolbarGroup lastChild={true} style={{ float: 'right' }}>
          <ToolbarTitle text={_.get(_.find(subjects, { _id: subjectId }), 'name')}/>
        </ToolbarGroup>
      </Toolbar>
    );
  },
});

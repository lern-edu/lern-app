import React from 'react';
import { Toolbar, ToolbarSeparator, ToolbarTitle, ToolbarGroup, RaisedButton, } from 'material-ui';

AdminContentToolbar = React.createClass({
  render() {
    const { tags, subjects } = this.props;

    return (
      <Toolbar>
        <ToolbarGroup float='left'>
          <ToolbarTitle
          text={`${subjects.length} Matérias e ${tags.length} Tags`} />
        </ToolbarGroup>
        <ToolbarGroup float='right'>
          <ToolbarTitle text='Questões'/>
          <ToolbarSeparator/>
          <RaisedButton
            label='Nova'
            primary={true}
            linkButton={true}
            style={{ textAlign: 'center' }}
            href={FlowRouter.path('AdminQuestionCreate', {}, {})} />
        </ToolbarGroup>
      </Toolbar>
    );
  },
});

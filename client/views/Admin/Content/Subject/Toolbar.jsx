import React from 'react';
import { Toolbar, ToolbarSeparator, ToolbarTitle, ToolbarGroup, RaisedButton, } from 'material-ui';

AdminSubjectToolbar = React.createClass({

  render() {
    const { tags, subject } = this.props;

    return (
      <Toolbar>
        <ToolbarGroup float='left'>
          <ToolbarTitle
          text={`${_.get(subject, 'name')} -- ${tags.length} Tags`}/>
        </ToolbarGroup>
        <ToolbarGroup float='right'>
          <ToolbarTitle text='Matéria'/>
          <ToolbarSeparator/>
          <RaisedButton
            label='Nova'
            primary={true}
            linkButton={true}
            style={{ textAlign: 'center' }}
            href={FlowRouter.path('AdminHome')}
          />
        </ToolbarGroup>
      </Toolbar>
    );
  },

});

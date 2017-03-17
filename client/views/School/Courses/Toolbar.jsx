import React from 'react';
import { Toolbar, ToolbarSeparator } from 'material-ui';
import { ToolbarTitle, ToolbarGroup, RaisedButton } from 'material-ui';

const SchoolCoursesToolbar = React.createClass({

  // Lifecycle

  contextTypes: {
    user: React.PropTypes.object,
  },

  // Render

  render() {
    const { user } = this.context;

    return (
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text='Cursos' />
        </ToolbarGroup>
        <ToolbarGroup lastChild={true} >
          <RaisedButton
            label='Novo'
            primary={true}
            style={{ textAlign: 'center' }}
            href={FlowRouter.path('SchoolCourseCreate')} />
        </ToolbarGroup>
      </Toolbar>
    );
  },
});

export default SchoolCoursesToolbar;

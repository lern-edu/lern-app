// Libs
import React from 'react';
import { TextField, FlatButton } from 'material-ui';

// Views
import StudentCourseIngressFormCourse from './Course/CourseContainer.jsx';

const StudentCourseIngressForm = React.createClass({

  // Initial state

  getInitialState() {
    return { alias: this.props.alias };
  },

  // Handlers

  handleAliasChange(event, alias) {
    this.setState({ alias });
  },

  handleUpdateAlias() {
    FlowRouter.setQueryParams({ alias: this.state.alias });
  },

  /* Render
  */

  render() {
    return (
      <div className='ui basic segment'>

        <div className='row'>
          <TextField
            value={this.state.alias}
            floatingLabelText='Chave de curso'
            onChange={this.handleAliasChange} />
        </div>

        <div className='row' style={{ marginTop: 5, marginBotton: 5 }} >
          <FlatButton
            label='Buscar'
            primary={true}
            onTouchTap={this.handleUpdateAlias} />
        </div>

        <StudentCourseIngressFormCourse
          alias={this.props.alias}
          form={this}
          key='course' />

      </div>
    );
  },
});

export default StudentCourseIngressForm;

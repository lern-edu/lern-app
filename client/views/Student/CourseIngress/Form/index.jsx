// Libs
import React from 'react';
import { TextField, RaisedButton } from 'material-ui';

// Views
import StudentCourseIngressFormCourse from './Course/CourseContainer.jsx';

const StudentCourseIngressForm = React.createClass({

  // Initial state

  getInitialState() {
    return { alias: this.props.alias };
  },

  // Handlers

  handleAliasChange(event, alias) {
    this.setState({ alias: _.trim(_.lowerCase(_.deburr(alias))).replace(' ', '') });
  },

  handleUpdateAlias() {
    FlowRouter.setQueryParams({ alias: this.state.alias });
  },

  handlePressEnter(event) {
    if (event.keyCode == 13) this.handleUpdateAlias();
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
            onChange={this.handleAliasChange}
            onKeyDown={this.handlePressEnter}
          />
        </div>

        <div className='row' style={{ marginTop: 5, marginBotton: 5 }} >
          <RaisedButton
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

// Libs
import React from 'react';
import { RaisedButton } from 'material-ui';

// Views
import StudentSetupFormUser from './User/User.jsx';

const StudentSetupForm = React.createClass({
  mixins: [AstroForm(Meteor.users.Schema, 'StudentUserSave')],

  // Handlers

  handleSubmit() {
    this.defaultHandler({ 'profile.setup': false }, { doc: true });
    this.defaultSubmit();
  },

  handleSubmitSuccess() {
    const { alias } = this.props;
    if (alias) FlowRouter.go('StudentCourseIngress', {}, { alias });
    else FlowRouter.go('StudentHome');
    snack('Cadastro finalizado!');
  },

  /* Render
  */

  render() {
    return (
      <div className='ui basic segment'>

        <StudentSetupFormUser doc={this.doc.get('profile')} form={this} />

        <div className='row' style={{ marginTop: 5 }} >
          <RaisedButton
            label='Terminar'
            primary={true}
            onTouchTap={this.handleSubmit} />
        </div>

      </div>
    );
  },
});

export default StudentSetupForm;

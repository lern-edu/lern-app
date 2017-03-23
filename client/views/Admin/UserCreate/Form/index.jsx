// Libs
import React from 'react';

// Views
import AdminUserCreateFormSteps from './Steps.jsx';
import AdminUserCreateFormBasic from './Basic.jsx';
import AdminUserCreateFormRest from './Rest.jsx';

AdminUserCreateForm = React.createClass({
  mixins: [AstroForm(Meteor.users.FormSchema, 'AdminUserCreate')],

  /* Lifecycle
  */

  getInitialState() {
    return { index: 0, waitingCallback: false };
  },

  /* Methods
  */

  nextStep() {
    const { index } = this.state;
    this.setState({ index: index + 1 });
  },

  prevStep() {
    const { index } = this.state;
    this.setState({ index: index - 1 });
  },

  /* Handlers
  */

  handleSubmit() {
    this.setState({ waitingCallback: true });
    this.defaultSubmit();
  },

  handleSubmitError() {
    this.setState({ waitingCallback: false });
    snack('Problemas ao criar teste');
  },

  handleSubmitSuccess({ _id }) {
    this.setState({ waitingCallback: false });
    console.log(`User created: ${_id}`);
    FlowRouter.go('AdminHome', {}, { active: 'users' });
  },

  /* Render
  */

  render() {
    const { index } = this.state;

    return (
      <div className='ui basic segment'>

        <AdminUserCreateFormSteps index={index} />
          {[
            <AdminUserCreateFormBasic {...this.props} form={this} key='basic'/>,
            <AdminUserCreateFormRest {...this.props} form={this} key='rest'/>,
          ][index]}

      </div>
    );
  },
});

export default AdminUserCreateForm;

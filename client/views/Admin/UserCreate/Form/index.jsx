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
    return { index: 0 };
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

  handleSubmitSuccess({ _id }) {
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

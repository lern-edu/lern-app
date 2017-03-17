// Libs
import React from 'react';

// Views
import StudentSetupForm from './Form/index.jsx';

StudentSetup = React.createClass({

  // Lifecycle

  contextTypes: {
    user: React.PropTypes.object,
  },

  /* Render
  */

  render() {
    const { user } = this.context;
    return (
      <div className='ui container'>
        <Layout.Bar
          title='Configurações de cadastro'
          disableActions={_.get(user, 'profile.setup')} />
        <StudentSetupForm {...this.props} doc={user} />
      </div>
    );
  },
});

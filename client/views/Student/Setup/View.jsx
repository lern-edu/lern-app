// Libs
import React from 'react';
import PropTypes from 'prop-types';

// Views
import StudentSetupForm from './Form/index.jsx';

StudentSetup = React.createClass({

  // Lifecycle

  contextTypes: {
    user: PropTypes.object,
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

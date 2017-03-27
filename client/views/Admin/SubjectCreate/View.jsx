// Libs
import React from 'react';
import { LinearProgress } from 'material-ui';

// Views
import AdminSubjectCreateForm from './Form/index.jsx';

AdminSubjectCreate = React.createClass({

  render() {
    const { ready } = this.props;
    return (
      <div className='ui container'>

        <Layout.Bar title='Nova Matéria' />

        <AdminSubjectCreateForm />

      </div>
    );
  },

});

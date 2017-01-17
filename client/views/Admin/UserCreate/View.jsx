// Libs
import React from 'react';

// Views
import AdminUserCreateForm from './Form/index.jsx';

const View = React.createClass({

  /* Render
  */

  render() {
    return (
      <div className='ui container'>
        <Layout.Bar title='Novo Usuário' crumbs={[{ label: 'Home', path: 'AdminHome' }]} />
        <AdminUserCreateForm {...this.props} />
      </div>
    );
  },
});

export default View;

// Lib
import React from 'react';

// View
import AdminTestCreateForm from './Form/index.jsx';

const View = React.createClass({

  /* Render
  */

  render() {
    return (
      <div className='ui container'>

        <Layout.Bar
          title='Nova Prova'
          crumbs={[{ label: 'Provas', path: 'AdminTests' }]} />

        <AdminTestCreateForm {...this.props} />

      </div>
    );
  },
});

export default View;

// Lib
import React from 'react';

// View
import SchoolTestCreateForm from './Form/index.jsx';

const View = React.createClass({

  /* Render
  */

  render() {
    return (
      <div className='ui container'>

        <Layout.Bar
          title='Nova Prova'
          crumbs={[{ label: 'Provas', path: 'SchoolTests' }]} />

        <SchoolTestCreateForm {...this.props} />

      </div>
    );
  },
});

export default View;

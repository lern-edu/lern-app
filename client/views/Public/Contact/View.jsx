// Libs
import React from 'react';

// Views
import PublicContactForm from './Form/index.jsx';

PublicContact = React.createClass({

  /* Render
  */

  render() {

    return (
      <div className='ui container'>

          <Layout.Bar title='Contato' />

          <PublicContactForm {...this.props}/>

      </div>
    );
  },
});

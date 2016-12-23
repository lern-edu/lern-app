import React from 'react';

PublicContactView = React.createClass({
  contextTypes: {
    screen: React.PropTypes.string,
  },

  /* Render
  */

  render() {
    const { screen } = this.context;

    return (
      <div className='ui centered grid'>
        <div className={`${screen === 'computer' ? 'six' : 'sixteen'} wide column`}>

          <Layout.Bar
            title='Contato'
          />

          <PublicContactForm {...this.props}/>

        </div>
      </div>
    );
  },
});

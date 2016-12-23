import React from 'react';

AdminUserCreateView = React.createClass({
  mixins: [ReactMeteorData],

  /* Reactive Data Fetching
  */

  getMeteorData() {
    const handles = {
      schools: Meteor.subscribe('AdminUsers', { roles: 'school' }),
    };

    return {
      ready: _.mapValues(handles, h => h.ready()),
      schools: Fetch.General.users({ roles: 'school' }).fetch(),
    };
  },

  /* Render
  */

  render() {
    return (
      <div className='ui container'>
        <Layout.Bar title='Novo Usuário' />
        <AdminUserCreateForm {...this.data} />
      </div>
    );
  },
});

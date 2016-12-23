import React from 'react';

AdminUsersView = React.createClass({
  mixins: [ReactMeteorData],

  // lifecycle

  getInitialState() {
    return { query: '' };
  },

  getMeteorData() {
    const handles = {
      users: Meteor.subscribe('AdminUsers'),
      courses: Meteor.subscribe('AdminCourses'),
    };

    return {
      ready: _.mapValues(handles, h => h.ready()),
      users: Fetch.General.users().fetch(),
      courses: Fetch.General.courses().fetch(),
    };
  },

  // Handlers

  handleUpdateQuery({ target: { value: query } }) {
    this.setState({ query });
  },

  render() {
    const { data: { ready }, state: { query } } = this;

    return (
      <div className='ui container'>

        <Layout.Bar title='Usuários' />
        {!_.every(ready) ? <MUI.LinearProgress /> : [
          <AdminUsersToolbar update={this.handleUpdateQuery} key='toolbar'/>,
          <AdminUsersList {...this.data} query={query} key='list'/>,
        ]}

      </div>

    );
  },
});

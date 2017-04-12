import React from 'react';

import SchoolUsersList from './List/ListContainer.jsx';
import SchoolUsersToolbar from './Toolbar.jsx';

SchoolUsers = React.createClass({

  // Lifecicle

  getInitialState() {
    return { name: '' };
  },

  /* Render
  */

  render() {
    const { ready, courses, subjects } = this.props;

    return (
      <div className='ui container'>
        <Layout.Bar title='Alunos' />
        <SchoolUsersToolbar parent={this} />
        <SchoolUsersList filter={this.state} />
      </div>
    );
  },
});

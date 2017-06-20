// Libs
import React from 'react';

// Views
import AdminHomeMenu from './Menu.jsx';
import AdminHomeSubjects from './Subjects/index.jsx';
import AdminHomeUsers from './Users/index.jsx';

export default class AdminHomeView extends React.Component {

  render() {
    const { active='subjects' } = this.props;

    return (
      <div className='ui container'>

        <Layout.Bar title='Home' />

        <AdminHomeMenu active={active} />

        {
          _.get({
            subjects: <AdminHomeSubjects {...this.props} key='subjects'/>,
            users: <AdminHomeUsers {...this.props} key='users' />,
          }, active)
        }

      </div>

    );
  }

};

// Libs
import React from 'react';

// Views
import SchoolCourseCreateForm from './Form/index.jsx';

const SchoolCourseCreateView = React.createClass({

  /* Render
  */

  render() {
    return (
      <div className='ui container'>
        <Layout.Bar title='Novo curso' />
        <SchoolCourseCreateForm {...this.props} />
      </div>
    );
  },
});

export default SchoolCourseCreateView;

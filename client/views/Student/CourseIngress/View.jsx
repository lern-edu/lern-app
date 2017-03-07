// Libs
import React from 'react';

// Views
import StudentCourseIngressForm from './Form/index.jsx';

StudentCourseIngress = React.createClass({

  /* Render
  */

  render() {
    return (
      <div className='ui container'>
        <Layout.Bar title='Ingressar em curso' />
        <StudentCourseIngressForm {...this.props} />
      </div>
    );
  },
});

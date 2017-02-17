import React from 'react';
import { Card, CardTitle, Paper } from 'material-ui';

import StudentCourseShowHomeCard from './Card.jsx';

StudentCourseShowHome = React.createClass({

  /* Lifecycle
  */

  getInitialState() {
    return { };
  },

  /* Render
  */

  render() {
    const { course } = this.props;

    return (
      <div className='ui container fluid' style={{ marginTop: '30px' }}>
       <div className='ui centered grid' style={{ margin: '0 !important' }}>
         <StudentCourseShowHomeCard course={course} {...this.props}/>
       </div>
     </div>
    );
  },
});

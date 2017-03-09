import React from 'react';
import { Card, CardTitle, Paper } from 'material-ui';

import StudentCourseShowHomeCard from './Card.jsx';
import StudentCourseShowHomeTitle from './Title.jsx';

const StudentCourseShowHome = React.createClass({

  /* Render
  */

  render() {
    const { course } = this.props;

    return (
      <div className='ui basic segment'>

        <StudentCourseShowHomeTitle {...this.props} />

        <StudentCourseShowHomeCard {...this.props} />

      </div>
    );
  },
});

export default StudentCourseShowHome;

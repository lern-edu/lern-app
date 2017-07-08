// libs
import React from 'react';

// Views
import TeacherCourseShowTestsCard from './Card.jsx';

export default class TeacherCourseShowTests extends React.Component{

  /* Render
  */

  render() {
    const { tests } = this.props;

    const sorted = _.sortBy(tests, 'startDate');

    return (
      <div className='ui grid container' style={{ marginTop: 10 }}>

        {
          _.map(sorted, test =>
            <TeacherCourseShowTestsCard test={test} {...this.props} key={test._id} />
          )
        }

      </div>
    );
  }
};

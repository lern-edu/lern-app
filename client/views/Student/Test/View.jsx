// Libs
import React from 'react';
import { Divider, LinearProgress } from 'material-ui';

// Views
import StudentTestTitle from './Title.jsx';
import StudentTestAttempts from './Attempts.jsx';
import StudentTestGrades from './Grades.jsx';
import StudentTestTags from './Tags.jsx';

const StudentTestView = React.createClass({

  /* Render
  */

  render() {
    const { ready, test, course } = this.props;

    return (
      <div className='ui container'>

        {
          _.every(ready) && _.get(test, 'course')
          ? <Layout.Bar
            title={_.get(test, 'name')}
            crumbs={
              [
                {
                  label: _.get(course, 'name'),
                  path: FlowRouter.path('StudentCourseShow', { courseId: _.get(test, 'course') }),
                },
              ]
            }
          />
          : <Layout.Bar title='Prova' />
        }

        <div className='ui basic segment'>

            {
              !_.every(ready)
                ? <LinearProgress />
                : [
                  <StudentTestTitle {...this.props} key='static'/>,

                  <StudentTestAttempts {...this.props} key='attempts'/>,

                  <StudentTestGrades {...this.props} key='grades'/>,

                  <StudentTestTags {...this.props} key='tags'/>,
              ]
            }

        </div>
      </div>
    );
  },
});

export default StudentTestView;

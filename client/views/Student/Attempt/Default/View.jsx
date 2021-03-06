// Libs
import React from 'react';
import { Divider } from 'material-ui';

// Views
import StudentAttemptDefaultTitle from './Title.jsx';
import StudentAttemptDefaultAnswers from './Answers.jsx';

const StudentAttemptDefaultView = React.createClass({

  render() {
    const { ready, test, attempt, course } = this.props;
    return (
      <div className='ui container'>

        {!_.every(ready) ? undefined :
          <Layout.Bar
            title={moment(attempt.finishedAt).format('LL')}
            crumbs={
              [
                {
                  label: _.get(course, 'name'),
                  path: FlowRouter.path(
                    'StudentCourseShow',
                    { courseId: _.get(test, 'course') }
                  ),
                }, {
                  label: test.name,
                  path: FlowRouter.path(
                    'StudentTest',
                    { testId: test._id }
                  ),
                },
              ]
            }
          />
        }

        <div className='ui basic segment'>

            {
              !_.every(ready) ? undefined : [
                <StudentAttemptDefaultTitle {...this.props} key='static'/>,
                <Divider key='divider0'/>,
                <StudentAttemptDefaultAnswers {...this.props} key='grades'/>,
              ]
            }

        </div>

      </div>
    );
  },
});

export default StudentAttemptDefaultView;

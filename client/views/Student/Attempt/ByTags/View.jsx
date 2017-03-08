// Libs
import React from 'react';
import { Divider } from 'material-ui';

// Views
import StudentAttemptByTagsData from './Data.jsx';
import StudentAttemptByTagsTitle from './Title.jsx';

const StudentAttemptByTagsView = React.createClass({
  /* Get Context
  */

  contextTypes: {
    user: React.PropTypes.object,
  },

  // Render

  render() {
    const { ready, test, attempt, course } = this.props;
    return (
      <div>

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

        <div className='ui centered grid'>
          <div className='ten wide computer sixteen wide tablet column'>

              {!_.every(ready) ? undefined : [
                <StudentAttemptByTagsTitle {...this.props} key='static'/>,
                <Divider key='divider0'/>,
                <StudentAttemptByTagsData {...this.props} {...this.context} key='grades'/>,
              ]}

          </div>
        </div>

      </div>
    );
  },
});

export default StudentAttemptByTagsView;

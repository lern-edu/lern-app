// Libs
import React from 'react';
import { LinearProgress } from 'material-ui';

// Views
import StudentTestAttemptGlobal from './Global/index.jsx';
import StudentTestAttemptPage from './Page/index.jsx';

const StudentTestAttemptView = React.createClass({

  render() {
    const { ready, test, course, attempt } = this.props;

    return (
      <div>

        <Layout.Bar
          title={_.get(test, 'name')}
          crumbs={[
            {
              label: _.get(course, 'name'),
              path: FlowRouter.path('StudentCourseShow', { courseId: _.get(course, '_id') }),
            },
          ]}
        />

        {
          _.every(ready) && attempt
            ?
              _.get({
                page: <StudentTestAttemptPage {...this.props} key='page'/>,
                global: <StudentTestAttemptGlobal {...this.props} key='global'/>,
                none: <StudentTestAttemptGlobal {...this.props} key='none'/>,
              }, test.timeoutType)
            : <LinearProgress />
        }

      </div>
    );
  },
});

export default StudentTestAttemptView;

import React from 'react';
import { LinearProgress } from 'material-ui';

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

        {_.every(ready) && attempt ? <StudentTestAttemptPage {...this.props} /> :
           <LinearProgress />}

      </div>
    );
  },
});

export default StudentTestAttemptView;

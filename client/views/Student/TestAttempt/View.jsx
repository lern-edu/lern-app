import React from 'react';
import { LinearProgress } from 'material-ui';

import StudentTestAttemptToolbar from './Toolbar.jsx';
import StudentTestAttemptFooter from './Footer.jsx';

const StudentTestAttemptView = React.createClass({

  render() {
    const { ready, test, course, page } = this.props;

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

        {!_.every(ready) ? <LinearProgress /> : [
          <StudentTestAttemptToolbar {...this.props} key='toolbar'/>,
          <StudentTestAttemptPage {...this.props} key='page' />,
          <StudentTestAttemptFooter {...this.props} key='footer' />,
        ]}

      </div>
    );
  },
});

export default StudentTestAttemptView;

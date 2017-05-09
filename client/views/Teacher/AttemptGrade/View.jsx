// Libs
import React from 'react';
import { LinearProgress } from 'material-ui';

// Views
import TeacherAttemptGradeMenu from './Menu.jsx';

const TeacherAttemptGradeView = React.createClass({

  /* Render
  */

  render() {
    const { ready, test, author, course } = this.props;

    return (
      <div className='ui container'>

        <Layout.Bar
          title={_.get(author, 'profile.name')}
          crumbs={[
            { label: _.get(test, 'name'),
              path: FlowRouter.path(
                `TeacherTestShow${_.get(test, 'resolution')}`,
                { courseId: _.get(course, '_id'), testId: _.get(test, '_id') }
              ),
            },
          ]}
        />

        {
          !_.every(ready)
          ? <LinearProgress />
          : <TeacherAttemptGradeMenu {...this.props} />
        }
      </div>
    );
  },
});

export default TeacherAttemptGradeView;

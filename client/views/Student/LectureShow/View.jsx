// Libs
import React from 'react';
import { LinearProgress } from 'material-ui';

// Views
import StudentLectureShowContent from './Content.jsx';

const StudentLectureShowView = React.createClass({

  // Render

  render() {
    const { ready, lecture, course } = this.props;

    console.log(this.props);

    return (
      <div className='ui container'>

        <Layout.Bar
          title={_.get(lecture, 'name')}
          crumbs={[
            {
              label: _.get(course, 'name'),
              path: FlowRouter.path(
                'StudentCourseShow',
                { courseId: _.get(course, '_id') },
                { active: 'lectures' }
              ),
            },
          ]}
        />

        {
          !_.every(ready)
          ? <LinearProgress />
          : <StudentLectureShowContent {...this.props} />
        }

      </div>
    );
  },
});

export default StudentLectureShowView;

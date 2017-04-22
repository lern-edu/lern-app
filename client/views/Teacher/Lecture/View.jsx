// Libs
import React from 'react';
import { LinearProgress } from 'material-ui';

// Views
import TeacherLectureForm from './Form/index.jsx';

const TeacherLectureView = React.createClass({
  /* Render
  */

  render() {
    const { ready, lecture, course } = this.props;

    return (
      <div className='ui container'>

        <Layout.Bar
          title='Aula'
          crumbs={[
            {
              label: _.get(course, 'name'),
              path: FlowRouter.path('TeacherCourseShow', { courseId: _.get(course, '_id') }),
            },
          ]}
        />

        {
          !_.every(ready)
          ? <LinearProgress />
          : <TeacherLectureForm {...this.props} doc={lecture} />
        }

      </div>
    );
  },
});

export default TeacherLectureView;

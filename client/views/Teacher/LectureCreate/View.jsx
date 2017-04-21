// Libs
import React from 'react';
import { LinearProgress } from 'material-ui';

// Views
import TeacherLectureCreateForm from './Form/index.jsx';

const TeacherLectureCreateView = React.createClass({

  render() {
    const { ready, course } = this.props;
    return (
      <div className='ui container'>

        <Layout.Bar
          title='Nova Aula'
          crumbs={
            [
              {
                label: _.get(course, 'name'),
                path: FlowRouter.path('TeacherCourseShow', { courseId: _.get(course, '_id') }),
              },
            ]
          }
        />

        {_.every(ready)
          ? <TeacherLectureCreateForm {...this.props} />
          : <LinearProgress />
        }

      </div>
    );
  },
});

export default TeacherLectureCreateView;

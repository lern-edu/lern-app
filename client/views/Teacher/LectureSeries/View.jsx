// Libs
import React from 'react';
import { LinearProgress } from 'material-ui';

// Views
import TeacherLectureSeriesForm from './Form/index.jsx';

export default class TeacherLectureSeriesView extends React.Component {
  /* Render
  */

  render() {
    const { ready, course } = this.props;

    return (
      <div className='ui container'>

        <Layout.Bar
          title='Novas aulas'
          crumbs={[
            {
              label: _.get(course, 'name'),
              path: FlowRouter.path(
                'TeacherCourseShow',
                { courseId: _.get(course, '_id') },
                { active: 'lectures' },
              ),
            },
          ]}
        />

        {
          !_.every(ready)
          ? <LinearProgress />
          : <TeacherLectureSeriesForm {...this.props} />
        }

      </div>
    );
  }

};

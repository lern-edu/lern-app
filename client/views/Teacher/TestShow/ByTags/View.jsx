// libs
import React from 'react';
import { LinearProgress } from 'material-ui';

// Views
import TeacherTestShowByTagsTable from './Table.jsx';
import TeacherTestShowByTagsTitle from './Title.jsx';
import TeacherTestShowByTagsTags from './Tags.jsx';

const TeacherTestShowByTagsView = React.createClass({

  // initial state

  getInitialState() {
    return { open: false };
  },

  /* Render
  */

  render() {
    const { ready, course, test } = this.props;

    return (
      <div className='ui container' >

        <Layout.Bar
          title={_.get(test, 'name')}
          crumbs={[
            { label: _.get(course, 'name'),
              path: FlowRouter.path('TeacherCourseShow',
              { courseId: _.get(course, '_id') }), },
          ]}
        />

        <div className='ui basic segment' >

          {
            !_.every(ready)
            ? <LinearProgress />
            : [
              <TeacherTestShowByTagsTitle {...this.props} key='title' />,
              <TeacherTestShowByTagsTable {...this.props} key='table' />,
              <TeacherTestShowByTagsTags {...this.props} key='tags' />,
            ]
          }

        </div>

      </div>
    );
  },
});

export default TeacherTestShowByTagsView;

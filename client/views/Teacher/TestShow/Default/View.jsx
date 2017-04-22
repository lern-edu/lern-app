import React from 'react';
import { LinearProgress } from 'material-ui';

const TeacherTestShowDefaultView = React.createClass({

  // Lifecycle

  componentWillMount() {
    FlowRouter.setQueryParams({ attemptsFilter: 'grade', infosFilter: 'grade', chart: 'false' });
  },

  // initial state

  getInitialState() {
    return { open: false };
  },

  /* Render
  */

  render() {
    const { props: { ready, course, test, filter='all', tab='attempts' },
      state: { open }, } = this;

    return (
      <div>

        <Layout.Bar
          title={_.get(test, 'name')}
          crumbs={[
            { label: _.get(course, 'name'),
              path: FlowRouter.path('TeacherCourseShow',
              { courseId: _.get(course, '_id') }), },
          ]}
        />

        <TeacherTestShowDefaultTabs tab={tab} tabChange={this.handleTabChange}/>

        <div className='ui container' >

          {
            !_.every(ready)
            ? <LinearProgress />
            : _.get({
              attempts: [
                <TeacherTestShowDefaultToolbar key='toolbar' value={filter} parent={this}/>,
                <TeacherTestShowDefaultList key='list' filter={filter} {...this.props} />,
              ],
              info: [
                <TeacherTestShowDefaultInfo key='info' {...this.props} />,
                <TeacherTestShowDefaultMetrics key='metric' {...this.props}/>,
              ],
            }, tab)
          }

        </div>

      </div>
    );
  },
});

export default TeacherTestShowDefaultView;

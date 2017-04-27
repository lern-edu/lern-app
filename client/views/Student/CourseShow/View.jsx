// Libs
import React from 'react';
import { LinearProgress } from 'material-ui';

// Views
import StudentCourseShowMenu from './Menu.jsx';
import StudentCourseShowInitial from './Initial.jsx';
import StudentCourseShowHome from './Home/index.jsx';
import StudentCourseShowLectures from './Lectures/index.jsx';
import StudentCourseShowTests from './Tests/index.jsx';
import StudentCourseShowReports from './Reports/index.jsx';
import StudentCourseShowPosts from './Posts/index.jsx';

const StudentCourseShowView = React.createClass({

  /* Get Context
  */

  contextTypes: {
    user: React.PropTypes.object,
  },

  /* Render
  */

  render() {
    const { ready, course, active='home' } = this.props;
    const { user } = this.context;

    console.log(this.props);
    return (
      <div>

        <Layout.Bar
          title={_.get(course, 'name')}
          crumbs={[{ label: 'Disciplinas', path: 'StudentCourses' }]} />

        <StudentCourseShowMenu active={active} {...this.props} />

          {
            !_.every(ready)
            ? <LinearProgress />
            : <div className='ui container'>
              {
                _.get({
                  home: <StudentCourseShowHome {...this.props} key='home' />,
                  lectures: <StudentCourseShowLectures {...this.props} key='lectures' />,
                  tests: <StudentCourseShowTests {...this.props} key='tests' />,
                  reports: <StudentCourseShowReports {...this.props} user={user} key='reports' />,
                  posts: <StudentCourseShowPosts {...this.props} user={user} key='posts' />,
                }, active)
              }
            </div>
          }

      </div>
    );
  },
});

export default StudentCourseShowView;

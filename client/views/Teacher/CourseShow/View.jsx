import React from 'react';
import { LinearProgress } from 'material-ui';
import { FloatingActionButton, FontIcon } from 'material-ui';

import TeacherCourseShowMenu from './Menu.jsx';
import TeacherCourseShowTests from './Tests/index.jsx';
import TeacherCourseShowReports from './Reports/index.jsx';
import TeacherCourseShowLectures from './Lectures/index.jsx';
import TeacherCourseShowHome from './Home/index.jsx';
import TeacherCourseShowPosts from './Posts/index.jsx';

const TeacherCourseShowView = React.createClass({

  styles: {
    floatingButton: {
      className: 'ui right aligned basic segment',
      style: { position: 'fixed', bottom: '1em', right: '1em', zIndex: '1000' },
    },
  },

  /* Render
  */

  render() {
    const { active='home' } = this.props;
    const { ready, course } = this.props;
    const { tabs } = this;

    return (
      <div>

        <Layout.Bar
          title={_.get(course, 'name')}
          crumbs={
            [
              { label: 'Turmas', path: 'TeacherCourses' },
            ]
          }
        />

        <TeacherCourseShowMenu active={active} />

        {
          !_.every(ready)
          ? <LinearProgress />
          : <div className='ui container'>
            {
              _.get({
                lectures: <TeacherCourseShowLectures {...this.props} key='lectures' />,
                tests: <TeacherCourseShowTests {...this.props} key='tests' />,
                grades: <TeacherCourseShowGrades {...this.props} key='grades' />,
                diary: <TeacherCourseShowDiary {...this.props} key='diary' />,
                reports: <TeacherCourseShowReports {...this.props} key='reports' />,
                posts: <TeacherCourseShowPosts {...this.props} key='posts' />,
                home: <TeacherCourseShowHome {...this.props} key='home' />,
              }, active)
            }
          </div>
        }

        {
          !_.includes(['tests', 'posts', 'lectures'], active) ? undefined :
            <div {...this.styles.floatingButton}>
              <FloatingActionButton
                children={<FontIcon className='material-icons'>add</FontIcon>}
                href={
                  FlowRouter.path(
                    `Teacher${
                      _.get({
                        posts: 'Post',
                        lectures: 'Lecture',
                        tests: 'Test',
                      }, active)
                    }Create`,
                    { courseId: _.get(course, '_id') },
                  )
                }
              />
            </div>
          }

      </div>
    );
  },
});

export default TeacherCourseShowView;

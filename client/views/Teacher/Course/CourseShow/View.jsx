import React from 'react';
import { LinearProgress } from 'material-ui';
import { FloatingActionButton, FontIcon } from 'material-ui';
import TeacherCourseShowMenu from '.Menu.jsx';
import TeacherCourseShowTests from './Tests/index.jsx';
import TeacherCourseShowReports from './Reports/index.jsx';

const TeacherCourseShowView = React.createClass({

  //  static data

  tabs: {
    lectures: 'Aulas',
    tests: 'Atividades',
    grades: 'Notas',
    diary: 'Diário',
    reports: 'Relatório',
    posts: 'Blog',
  },

  styles: {
    main: { className: 'sixteen wide tablet column' },
    floatingButton: {
      className: 'ui right aligned basic segment',
      style: { position: 'fixed', bottom: '1em', right: '1em', zIndex: '1000' },
    },
    children: {
      cards: {
        cardsGrid: { className: 'ui grid container', component: 'div' },
        cardContainer: {
          className: 'sixteen wide mobile seven wide tablet five wide computer column',
        },
        cardContent: { ref: 'animate', className: 'ui basic segment' },
      },
    },
  },

  //  Handlers

  handleTabChange(active) {
    FlowRouter.setQueryParams({ active });
  },

  /* Render
  */

  render() {
    let { active='lectures' } = this.props;
    const { ready, course } = this.props;
    const { tabs, styles: { main, floatingButton, children: { cards } } } = this;

    if (!_.includes(_.keys(tabs), active))
      active = 'lectures';

    return (
      <div>
        <Layout.Bar
          title={_.get(course, 'name')}
          crumbs={[
            { label: 'Disciplinas', path: 'TeacherCourses' },
          ]}
          zDepth="0"
        />

        <div className='ui centered grid'>

          <div {...main}>
            <TeacherCourseShowMenu active={active} />
          </div>

          <div {...main}>
            {!_.every(ready) ? <LinearProgress /> :
              <div>
                {_.get({
                  lectures: <TeacherCourseShowLectures {...this.data} styles={cards} key='lectures' />,
                  tests: <TeacherCourseShowTests {...this.data} styles={cards} key='tests' />,
                  grades: <TeacherCourseShowGrades {...this.data} key='grades' />,
                  diary: <TeacherCourseShowDiary {...this.data} key='diary' />,
                  reports: <TeacherCourseShowReports {...this.data} key='reports' />,
                  posts: <TeacherCourseShowPosts {...this.data} key='posts' />,
                }, active)}
              </div>}
          </div>

        </div>


        {!_.includes(['tests', 'posts', 'lectures'], active) ? undefined :
          <div {...floatingButton}>
            <FloatingActionButton
            href={FlowRouter.path(`Teacher${_.get({
              posts: 'Post',
              lectures: 'Lecture',
              tests: 'Test',
            }, active)}Create`, { courseId: _.get(course, '_id') },
            { course: _.get(course, '_id') })}
            children={<FontIcon className='material-icons'>add</FontIcon>} />
          </div>}

      </div>
    );
  },
});

export default TeacherCourseShowView;

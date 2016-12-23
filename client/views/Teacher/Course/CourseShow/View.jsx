import React from 'react';
import { FloatingActionButton, FontIcon } from 'material-ui';

TeacherCourseShowView = React.createClass({
  mixins: [ReactMeteorData],

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

  /* Reactive Data Fetching
  */

  getMeteorData() {
    const { courseId } = this.props;

    const handles = {
      subjects: Meteor.subscribe('PublicSubjects'),
      tags: Meteor.subscribe('PublicTags'),
      course: Meteor.subscribe('TeacherCourses', { courseId }, {
        posts: true,
        users: true,
        tests: true,
        lectures: true,
        attempts: true,
        answers: true,
        questions: true,
        grades: true,
      }),
    };

    const data = {
      ready: _.mapValues(handles, h => h.ready()),
      subjects: Fetch.Public().subjects().fetch(),
      tags: Fetch.Public().tags().fetch(),
      course: _.first(Fetch.General.courses(courseId).fetch()),
      images: Fetch.General.images().fetch(),
      documents: Fetch.General.documents().fetch(),
      attempts: Fetch.General.attempts().fetch(),
      answers: Fetch.General.answers().fetch(),
      questions: Fetch.General.questions().fetch(),
      grades: Fetch.General.grades().fetch(),
    };

    data.students = data.course && data.course.findStudents().fetch();
    data.teachers = data.course && data.course.findTeachers().fetch();
    data.tests = data.course && data.course.findTests().fetch();
    data.posts = data.course && data.course.findPosts().fetch();
    data.lectures = data.course && data.course.findLectures().fetch();
    data.userId = Meteor.userId();

    return data;
  },

  //  Handlers

  handleTabChange(active) {
    FlowRouter.setQueryParams({ active });
  },

  /* Render
  */

  render() {
    let { active='lectures' } = this.props;
    const { ready, course } = this.data;
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
            {!_.every(ready) ? <MUI.LinearProgress /> :
              <Semantic.Transitions component='div'>
                {_.get({
                  lectures: <TeacherCourseShowLectures {...this.data} styles={cards} key='lectures' />,
                  tests: <TeacherCourseShowTests {...this.data} styles={cards} key='tests' />,
                  grades: <TeacherCourseShowGrades {...this.data} key='grades' />,
                  diary: <TeacherCourseShowDiary {...this.data} key='diary' />,
                  reports: <TeacherCourseShowReports {...this.data} key='reports' />,
                  posts: <TeacherCourseShowPosts {...this.data} key='posts' />,
                }, active)}
              </Semantic.Transitions>}
          </div>

        </div>


        {!_.includes(['tests', 'posts', 'lectures'], active) ? undefined :
          <div {...floatingButton}>
            <FloatingActionButton
            linkButton={true}
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

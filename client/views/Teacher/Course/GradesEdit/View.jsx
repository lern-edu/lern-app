import React from 'react';
import { Tabs, Tab, Paper, LinearProgress } from 'material-ui';

TeacherGradesEditView = React.createClass({
  mixins: [ReactMeteorData],

  /* Reactive Data Fetching
  */

  getMeteorData() {
    const userId = Meteor.userId();
    const { courseId, query } = this.props;
    const { test } = this.state;

    const handles = {
      course: Meteor.subscribe('TeacherCourses', { courseId }, {
        tags: true,
        subjects: true,
        grades: true,
        users: true,
        tests: true,
        attempts: true,
        answers: true,
        grades: true,
      }),
    };

    const data = {
      ready: _.mapValues(handles, h => h.ready()),
      subjects: Fetch.Public().subjects().fetch(),
      tags: Fetch.Public().tags().fetch(),
      course: _.first(Fetch.General.courses(courseId).fetch()),
      attempts: Fetch.General.attempts({ test }).fetch(),
      answers: Fetch.General.answers().fetch(),
      tests: Fetch.General.tests({ scores: { $nin: [null] } }).fetch(),
      users: Meteor.users.find().fetch(),
      grades: Fetch.General.grades(query.gradesIds).fetch(),
    };

    return data;
  },

  getInitialState() {
    return { gradeType: 'test', test: null, deatachedGrade: null };
  },

  handleTabChange(gradeType) {
    this.setState({ gradeType, test: null, deatachedGrade: null });
  },

  handleTestCheck(event, state) {
    if (state)
      this.setState({ test: event.currentTarget.getAttribute('data-value') });
    else this.setState({ test: null });
  },

  handleDeatachedGrade(deatachedGrade) {
    this.setState({ test: null, deatachedGrade });
  },

  /* Render
  */

  render() {
    const { ready, course, tests, attempts, users, grades } = this.data;
    const { gradeType, test, deatachedGrade } = this.state;

    return (
      <div className='ui container'>

        <Layout.Bar
          title='Notas'
          crumbs={[
            { label: 'Disciplinas', path: 'TeacherCourses' },
            { label: _.get(course, 'name'),
              path: FlowRouter.path('TeacherCourseShow',
              { courseId: _.get(course, '_id') }), },
          ]}
        />
        {!_.every(ready) ? <LinearProgress /> :
        <div className='ui basic segment'>

          <div className='ui vertical basic segment'>
            <h2>Lançar notas</h2>
          </div>

          <div className='ui vertical basic segment'>
            Selecione um teste ou crie uma avaliação avulsa para lançar notas.
          </div>

          <div className='ui vertical basic segment'>
            <Tabs value={gradeType} onChange={this.handleTabChange}>
              {[
                <Tab key='test' value='test' label='Selecionar' />,
                <Tab key='create' value='create' label='Criar' />,
              ]}
            </Tabs>

            <Paper>
              {_.get({
                create: <TeacherGradesEditDeatachedGrade
                  handleDeatachedGrade={this.handleDeatachedGrade} />,
                test: <TeacherGradesEditTestSelect
                  handleTestCheck={this.handleTestCheck}
                  test={test}
                  tests={tests} />,
              }, gradeType)}
            </Paper>
          </div>

          {!(test || deatachedGrade) ? undefined : (
            test ? <TeacherGradesEditStudentsAttempt
              test={test}
              course={course}
              attempts={attempts}
              students={users}
              grades={grades}/> :
            (_.keys(deatachedGrade.getValidationErrors()).length > 1
              ? undefined : <TeacherGradesEditStudentsDeatachedGrade
                course={course}
                deatachedGrade={deatachedGrade}
                students={users}
                grades={grades}/>))}
        </div>}
      </div>
    );
  },
});

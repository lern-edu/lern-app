import React from 'react';

TeacherTestShowCognitiveView = React.createClass({
  mixins: [ReactMeteorData],

  // Lifecycle

  componentWillMount() {
    FlowRouter.setQueryParams({ attemptsFilter: 'grade', infosFilter: 'grade', chart: 'false' });
  },

  // initial state

  getInitialState() {
    return { open: false };
  },

  /* Reactive Data Fetching
  */

  getMeteorData() {
    const userId = Meteor.userId();
    const { testId, courseId } = this.props;

    const handles = {
      test: Meteor.subscribe('TeacherTest', testId, {
          attempts: true,
          documents: true,
          subjects: true,
          images: true,
          tags: true,
          questions: true,
          answers: true, }),
      course: Meteor.subscribe('TeacherCourses', { courseId: courseId },
        { users: true, grades: true }),
    };

    const data = {
      ready: _.mapValues(handles, h => h.ready()),
      test: _.first(Fetch.General.tests(testId).fetch()),
      course: _.first(Fetch.General.courses(courseId).fetch()),
    };

    data.questions = data.test && data.test.findQuestions().fetch();
    data.images = data.test && data.questions && _.flatten(_.map(data.questions, q =>
      q.findAllImages().fetch()));
    data.documents = data.test && data.test.findDocuments().fetch();
    data.attempts = data.test && data.test.findAttempts().fetch();
    data.subjects = data.test && data.test.findSubjects().fetch();
    data.tags = data.test && data.test.findTags().fetch();
    data.answers = data.test && data.test.findAnswers().fetch();
    data.students = data.course && data.course.findStudents().fetch();
    data.grades = data.course && data.course.findGrades().fetch();

    return data;
  },

  /* Render
  */

  render() {
    const { data: { ready, course, test },
      props: { filter='all', tab='attempts' },
      state: { open }, } = this;
    return (
      <div>

        <Layout.Bar
          title={_.get(test, 'name')}
          crumbs={[
            { label: 'Disciplinas', path: 'TeacherCourses' },
            { label: _.get(course, 'name'),
              path: FlowRouter.path('TeacherCourseShow',
              { courseId: _.get(course, '_id') }), },
          ]} />

        <div className='ui centered grid' style={{ paddingTop: '2em' }}>
          <div className='ten wide computer sixteen wide tablet column'>
            <TeacherTestShowCognitiveTabs tab={tab} tabChange={this.handleTabChange}/>
          </div>
          <div className='ten wide computer sixteen wide tablet column'>
            {!_.every(ready) ? <MUI.LinearProgress /> : _.get({
              attempts: [
                <TeacherTestShowCognitiveToolbar key='toolbar' value={filter} parent={this}/>,
                <TeacherTestShowCognitiveList key='list' filter={filter} {...this.data} />,
              ],
              info: [
                <TeacherTestShowCognitiveInfo key='info' {...this.data} />,
                <TeacherTestShowCognitiveMetrics key='metric' {...this.props} {...this.data}/>,
              ],
            }, tab)}
          </div>
        </div>

        <TeacherTestShowCognitiveToPDF open={open} parent={this} {...this.data} />

      </div>
    );
  },
});

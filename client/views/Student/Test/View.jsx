import React from 'react';

StudentTestView = React.createClass({
  mixins: [ReactMeteorData],

  /* Reactive Data Fetching
  */

  getMeteorData() {
    const { testId } = this.props;

    const handles = {
      test: Meteor.subscribe('StudentTests', { testId }, {
        questions: true,
        attempts: true,
        subjects: true,
        course: true,
        tags: true,
      }),
    };

    const data = {
      ready: _.mapValues(handles, h => h.ready()),
      test: _.first(Fetch.General.tests(testId).fetch()),
    };

    data.questions = data.test && data.test.findQuestions().fetch();
    data.attempts = data.test && data.test.findAttempts().fetch();
    data.subjects = data.test && data.test.findSubjects().fetch();
    data.course = data.test && _.head(data.test.findCourse().fetch());
    data.tags = data.test && data.test.findTags().fetch();

    return data;
  },

  /* Render
  */

  render() {
    const { ready, test, course } = this.data;

    return (
      <div className='ui container'>

        {_.every(ready) && _.get(test, 'course') ? <Layout.Bar title={_.get(test, 'name')}
        crumbs={[
          { label: _.get(course, 'name'), path: FlowRouter.path('StudentCourseShow', { courseId: _.get(test, 'course') }) },
        ]} /> : <Layout.Bar title='Prova' />}

        <div className='ui centered grid'>
          <div className='eight wide computer sixteen wide tablet column'>
            <MUI.Paper>

              {!_.every(ready) ? <MUI.LinearProgress /> : [
                <StudentTestTitle {...this.data} key='static'/>,
                <MUI.Divider key='divider0'/>,

                <StudentTestAttempts {...this.data} key='attempts'/>,
                <MUI.Divider key='divider1'/>,

                // <StudentTestStats {...this.data} key='stats'/>,
                // <MUI.Divider key='divider1'/>,

                <StudentTestGrades {...this.data} key='grades'/>,
                <MUI.Divider key='divider2'/>,

                <StudentTestTags {...this.data} key='tags'/>,
              ]}

            </MUI.Paper>
          </div>
        </div>
      </div>
    );
  },
});

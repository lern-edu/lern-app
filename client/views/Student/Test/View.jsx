import React from 'react';
import { Divider, LinearProgress, Paper } from 'material-ui';

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

        {
          _.every(ready) && _.get(test, 'course')
          ? <Layout.Bar
            title={_.get(test, 'name')}
            crumbs={
              [
                {
                  label: _.get(course, 'name'),
                  path: FlowRouter.path('StudentCourseShow', { courseId: _.get(test, 'course') }),
                },
              ]
            }
          />
          : <Layout.Bar title='Prova' />
        }

        <div className='ui basic segment'>

          <Paper>

            {!_.every(ready) ? <LinearProgress /> : [
              <StudentTestTitle {...this.data} key='static'/>,
              <Divider key='divider0'/>,

              <StudentTestAttempts {...this.data} key='attempts'/>,
              <Divider key='divider1'/>,

              // <StudentTestStats {...this.data} key='stats'/>,
              // <Divider key='divider1'/>,

              <StudentTestGrades {...this.data} key='grades'/>,
              <Divider key='divider2'/>,

              <StudentTestTags {...this.data} key='tags'/>,
            ]}

          </Paper>

        </div>
      </div>
    );
  },
});

import React from 'react';
import { Divider } from 'material-ui';

StudentAttemptCognitiveView = React.createClass({
  mixins: [ReactMeteorData],

  // Get data

  getMeteorData() {
    const { testId, attemptId } = this.props;

    const handles = {
      test: Meteor.subscribe('StudentTests', { testId }, {
        attempts: true,
        questions: true,
        subjects: true,
        course: true,
        tags: true,
      }),
      attempt: Meteor.subscribe('StudentAttempts', { attemptId }, {
        answers: true,
      }),
    };

    const data = {
      ready: _.mapValues(handles, h => h.ready()),
      test: _.first(Fetch.General.tests(testId).fetch()),
      attempt: _.first(Fetch.General.attempts(attemptId).fetch()),
    };

    data.attempts = data.test && data.test.findAttempts().fetch();
    data.questions = data.test && data.test.findQuestions().fetch();
    data.subjects = data.test && data.test.findSubjects().fetch();
    data.course = data.test && _.head(data.test.findCourse().fetch());
    data.tags = data.test && data.test.findTags().fetch();
    data.answers = data.attempt && data.attempt.findAnswers().fetch();
    data.images = data.questions &&
      _.flatten(_.map(data.questions, q => q.findAllImages().fetch()));

    return data;
  },

  /* Get Context
  */

  contextTypes: {
    user: React.PropTypes.object,
  },

  // Render

  render() {
    const { ready, test, attempt, course } = this.data;
    return (
      <div>

        {!_.every(ready) ? undefined :
          <Layout.Bar
            title={moment(attempt.finishedAt).format('LL')}
            crumbs={[
              { label: _.get(course, 'name'), path: FlowRouter.path('StudentCourseShow', { courseId: _.get(test, 'course') }) },
              { label: test.name, path: FlowRouter.path('StudentTest', { testId: test._id }) },
            ]}
          />
        }

        <div className='ui centered grid'>
          <div className='ten wide computer sixteen wide tablet column'>
            {/*<MUI.Paper>*/}

              {!_.every(ready) ? undefined : [
                <StudentAttemptCognitiveTitle {...this.data} key='static'/>,
                <Divider key='divider0'/>,
                <StudentAttemptCognitiveAnswers {...this.data} {...this.context} key='grades'/>,
              ]}

            {/*</MUI.Paper>*/}
          </div>
        </div>

      </div>
    );
  },
});

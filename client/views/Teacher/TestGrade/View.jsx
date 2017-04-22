import React from 'react';

TeacherTestGradeView = React.createClass({
  mixins: [ReactMeteorData],

  /* Reactive Data Fetching
  */

  getMeteorData() {
    const userId = Meteor.userId();
    const { testId, attemptId, questionId } = this.props;

    const handles = {
      test: Meteor.subscribe('TeacherTest', testId, { questions: true, course: true }),
      attempt: Meteor.subscribe('TeacherAttempt', attemptId, { answers: true, author: true }),
    };

    const data = {
      ready: _.mapValues(handles, h => h.ready()),
      test: _.first(Fetch.General.tests(testId).fetch()),
      attempt: _.first(Fetch.General.attempts(attemptId).fetch()),
    };

    data.answers = data.attempt && data.attempt.findAnswers().fetch();
    data.author = data.attempt && _.first(data.attempt.findAuthor().fetch());
    data.questions = data.test && data.test.findQuestions().fetch();
    data.course = _.first(data.test && data.test.findCourse().fetch());
    data.question = questionId && _.find(data.questions, { _id: questionId });
    data.answer = questionId && _.find(data.answers, { question: questionId });

    return data;
  },

  /* Render
  */

  render() {
    const { ready, question, course, test, author } = this.data;

    return (
      <div className='ui container'>
        <Layout.Bar
          title={_.get(author, 'profile.name')}
          crumbs={[
            { label: 'Disciplinas', path: 'TeacherCourses' },
            { label: _.get(course, 'name'),
              path: FlowRouter.path('TeacherCourseShow',
              { courseId: _.get(course, '_id') }), },
            { label: _.get(test, 'name'),
              path: FlowRouter.path('TeacherTestShow',
              { courseId: _.get(course, '_id'), testId: _.get(test, '_id') }), },
          ]} />

        {!_.every(ready) ? <MUI.LinearProgress /> :
          <div className='ui grid'>

            <Semantic.Transitions className='twelve wide column'>
              {question
                ? <TeacherTestGradeQuestion {...this.data} key={question._id}/>
                : <TeacherTestGradeOverview {...this.data} key='overview'/>
              }
            </Semantic.Transitions>

            <Semantic.Transitions className='four wide column'>
              <TeacherTestGradeMenu {...this.data} />
            </Semantic.Transitions>

          </div>
        }
      </div>
    );
  },
});

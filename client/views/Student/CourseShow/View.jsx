import React from 'react';

StudentCourseShowView = React.createClass({
  mixins: [ReactMeteorData],

  /* Reactive Data Fetching
  */

  getMeteorData() {
    const userId = Meteor.userId();
    const { courseId } = this.props;

    const handles = {
      course: Meteor.subscribe('StudentCourses', { courseId },
        { posts: true, users: true, tests: true, lectures: true,
          attempts: true, answers: true, questions: true, subjects: true, tags: true, }),
    };

    const data = {
      ready: _.mapValues(handles, h => h.ready()),
      course: _.first(Fetch.General.courses(courseId).fetch()),
      images: Fetch.General.images().fetch(),
      documents: Fetch.General.documents().fetch(),
      attempts: Fetch.General.attempts().fetch(),
      answers: Fetch.General.answers().fetch(),
      questions: Fetch.General.questions().fetch(),
    };

    data.students = data.course && data.course.findStudents().fetch();
    data.teachers = data.course && data.course.findTeachers().fetch();
    data.tests = data.course && data.course.findCurrentTests().fetch();
    data.posts = data.course && data.course.findPosts().fetch();
    data.lectures = data.course && data.course.findLectures().fetch();
    data.subjects = data.course && data.course.findSubjects().fetch();
    data.tags = data.course && data.course.findTags().fetch();

    return data;
  },

  /* Get Context
  */

  contextTypes: {
    user: React.PropTypes.object,
  },

  /* Render
  */

  render() {
    const { active='lectures' } = this.props;
    const { ready, course } = this.data;
    const { user } = this.context;

    return (
      <div>

        <Layout.Bar
          title={_.get(course, 'name')}
          crumbs={[
            { label: 'Disciplinas', path: 'StudentCourses' },
          ]}
          zDepth="0"
           />

        <StudentCourseShowMenu active={active} />

        <div className='ui container'>
          {!_.every(ready) ? <div className='ui active loader' /> :
            <Semantic.Transitions component='div'>
              {{
                lectures: <StudentCourseShowLectures {...this.data} key='lectures' />,
                tests: <StudentCourseShowTests {...this.data} key='tests' />,
                reports: <StudentCourseShowReports {...this.data} user={user} key='reports' />,
                posts: <StudentCourseShowPosts {...this.data} user={user} key='posts' />,
              }[active]}
            </Semantic.Transitions>
          }
        </div>

        {!_.every(ready) ? undefined :
        <StudentCourseShowInitial open={_.get(user, 'profile.tutorial')}
          {...this.data} user={user} />}

      </div>
    );
  },
});

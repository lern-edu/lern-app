AdminCourseView = React.createClass({
  mixins: [ReactMeteorData],

  /* Reactive Data Fetching
  */

  getMeteorData() {
    const { schoolId, courseId } = this.props;
    const userId = Meteor.userId();

    const handles = {
      subjects: Meteor.subscribe('PublicSubjects'),
      tags: Meteor.subscribe('PublicTags'),
      users: Meteor.subscribe('AdminSchoolUsers', schoolId),
      course: Meteor.subscribe('AdminCourses', { _id: courseId }),
    };

    const data = {
      ready: _.mapValues(handles, h => h.ready()),
      course: _.head(Fetch.General.courses().fetch()),
      subjects: Fetch.Public().subjects().fetch(),
      tags: Fetch.Public().tags().fetch(),
    };
    const selector = { 'profile.school': schoolId };
    data.teachers = data.course &&
      Fetch.General.users(_.assign(selector, { roles: 'teacher' })).fetch();
    data.students = data.course &&
      Fetch.General.users(_.assign(selector, { roles: 'student' })).fetch();

    return data;
  },

  /* Render
  */

  render() {
    const { ready, course } = this.data;
    return (
      <div className='ui container'>

        {!ready.course ? undefined : <Layout.Bar
          title={_.get(course, 'name')}
          crumbs={[
            { label: 'Escolas', path: 'AdminSchools' },
          ]} />}

        {!_.every(ready) ? <MUI.LinearProgress/> :
        <AdminCourseForm {...this.data} doc={course} />}
      </div>
    );
  },
});

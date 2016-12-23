/** Test create
  * @where {client}
  * @private View only
  * @param {Id} [courseId] From url
  * @param {Id} [course] From Session
  * @param {Id} [subject] From Session
  * @param {string} [text] From Session
  * @param {[Id]} [tags] From Session
  * @param {QuestionTypes} [type] From Session
  * @param {boolean} [onlyMine] From Session
  * @reactive Get questions for query and current course
  */

TeacherTestCreateView = React.createClass({
  mixins: [ReactMeteorData],

  /* Reactive Data Fetching
  */

  getMeteorData() {
    const userId = Meteor.userId();
    const { courseId } = this.props;
    const questionsIds = Session.get('selectedQuestions') || null;
    const skip = Session.get('searchPage') || 0;
    const selector = {
      course: courseId,
      subject: Session.get('searchSubject') || null,
      text: Session.get('searchText') || null,
      tags: Session.get('searchTags') || null,
      type: Session.get('searchType') || null,
      onlyMine: Session.get('searchOnlyMine') || false,
    };

    const handles = {
      course: Meteor.subscribe('TeacherCourses', { courseId },
        { tags: true, subjects: true }),
      questions: Meteor.subscribe('TeacherQuestionsText', questionsIds ? {} : selector,
        { limit: 52, skip }),
      selectedQuestions: Meteor.subscribe('PublicQuestions', { questionsIds }),
    };

    const data = {
      ready: _.mapValues(handles, h => h.ready()),
      course: _.first(Fetch.Teacher(userId).courses().fetch()),
      questions: Fetch.General.questions().fetch(),
    };

    data.subjects = data.course && data.course.subjects &&
      data.course.findSubjects().fetch();
    data.tags = data.course && data.course.tags &&
      data.course.findTags().fetch();
    data.images = data.questions && Fetch.General.images().fetch();

    return data;
  },

  /* Render
  */

  render() {
    const { data: { ready, course }, props: { courseId, query } } = this;

    return (
      <div>

        <Layout.Bar
          title='Nova atividade'
          crumbs={[
            { label: 'Disciplinas', path: 'TeacherCourses' },
            { label: _.get(course, 'name'),
              path: FlowRouter.path('TeacherCourseShow',
              { courseId: _.get(course, '_id') }), },
          ]} />

          <TeacherTestCreateForm {...this.data} {...query} courseId={courseId} />

      </div>
    );
  },
});

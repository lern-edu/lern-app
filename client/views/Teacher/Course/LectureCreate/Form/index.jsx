import React from 'react';

TeacherLectureCreateForm = React.createClass({
  mixins: [AstroForm(Lectures.Schema)],

  /* Licecycle
  */

  getInitialState() {
    return { dates: [] };
  },

  componentDidMount() {
    const courseId = FlowRouter.getParam('courseId');
    this.defaultHandler({ course: courseId }, { doc: true });
  },

  /* Handlers
  */

  handleSubmitSuccess({ _id }) {
    const { course } = this.props;
    console.log(`Lecture created: ${_id}`);
    FlowRouter.go('TeacherCourseShow', { courseId: course._id }, { active: 'lectures' });
  },

  handleTagsChange(str) {
    const ids = str ? str.split(',') : [];
    this.defaultHandler({ tags: ids }, { doc: true });
  },

  handleDateClick({ date }, event) {
    event.preventDefault();
    const { dates } = this.state;
    const indexes = _.map(dates, 'index');
    if (_.includes(indexes, date.index)) _.remove(dates, { index: date.index });
    else dates.push(date);
    this.setState({ dates });
  },

  handleSubmit() {
    const { course } = this.props;
    const { dates } = this.state;
    _.forEach(dates, date => {
      const doc = this.doc.copy();
      const startDate = moment({ y: date.day.year(), M: date.day.month(), d: date.day.date(), h: date.sched.startDate.getHours(), m: date.sched.startDate.getMinutes() });
      const endDate = moment({ y: date.day.year(), M: date.day.month(), d: date.day.date(), h: date.sched.endDate.getHours(), m: date.sched.endDate.getMinutes() });
      doc.set({ startDate, endDate });
      Meteor.call('TeacherLectureSave', doc, err => err ? console.log(err) : undefined);
    }); FlowRouter.go('TeacherCourseShow', { courseId: course._id });
  },

  /* Render
  */

  render() {
    const { errors, dates } = this.state;
    const { subjects, tags, course } = this.props;

    const submitable = _.isEmpty(_.omit(errors, ['startDate', 'endDate'])) && dates.length;

    return (
      <div className='ui centered form basic segment grid'>

        <div className='ten wide center aligned column'>
          <Semantic.Dropdown classes='search multiple selection fluid' onChange={this.handleTagsChange}>
            <input type='hidden' name='tags' />
            <i className='dropdown icon' />
            <div className='default text'>Tema da Aula</div>
            <div className='menu'>
              {_.map(_.map(course.tags, t => _.find(tags, { _id: t })), tag =>
                <div className='item' data-value={tag._id} data-text={tag.text} key={tag._id}>
                  <div className='description'>{_.get(_.find(subjects, { _id: tag.subject }), 'name')}</div>
                  <div className='text'>{tag.text}</div>
                </div>
              )}
            </div>
          </Semantic.Dropdown>
        </div>

        <div className='ten wide center aligned column'>
          <div className='field'>
            <Semantic.Input
              tag='textarea'
              rows={3}
              placeholder='Informações sobre a aula'
              onInput={this.defaultHandler('info', { doc: true })}
            />
          </div>
        </div>

        <div className='ten wide center aligned column'>
          <TeacherLectureCreateFormDays
            {...this.props}
            indexes={_.map(dates, 'index')}
            onClick={this.handleDateClick}
          />
        </div>

        <div className='ten wide center aligned column'>
          <Semantic.Button
            classes={submitable ? 'blue' : 'disabled'}
            onClick={this.handleSubmit}
          >Salvar</Semantic.Button>
        </div>

      </div>
    );
  },
});

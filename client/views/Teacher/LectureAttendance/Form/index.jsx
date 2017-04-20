import React from 'react';
import { Toggle, TextField, Divider } from 'material-ui';

TeacherLectureAttendanceForm = React.createClass({
  mixins: [AstroForm(Lectures.Schema, 'TeacherLectureSave')],

  // Static data

  instructions: {
    info: 'Defina uma informação para aula',
  },

  /* Lifecycle
  */

  getInitialState() {
    const { lecture, students } = this.props;
    const studentIds = _.map(students, '_id');
    const missing = lecture.attendants ? _.difference(studentIds, lecture.attendants) : [];
    return { missing };
  },

  componentWillMount() {
    const { props: { students }, doc: { attendants } } = this;
    if (!attendants) this.defaultHandler({ attendants: _.map(students, '_id') },
      { doc: true });
  },

  /* Handlers
  */

  handleInfoChange({ target: { value: info } }) {
    this.defaultHandler({ info }, { doc: true });
  },

  handleStudentClick({ userId }) {
    const { students, course } = this.props;
    const { missing } = this.state;
    if (_.includes(missing, userId)) _.pull(missing, userId);
    else missing.push(userId);
    this.setState({ missing });

    const studentIds = _.map(students, '_id');
    const attendants = _.difference(studentIds, missing);
    this.defaultHandler({ attendants }, { doc: true });
  },

  handleHomeworkChange(event, homework) {
    this.defaultHandler({ homework }, { doc: true });
  },

  handleSubmitSuccess({ _id, test }) {
    const { course, lecture } = this.props;
    console.log(`Lecture.attendance updated: ${_id}`);
    if (test) console.log(`Test created: ${test}`);
    FlowRouter.go('TeacherCourseShow', { courseId: course._id, lectureId: lecture._id });
  },

  /* Render
  */

  render() {
    const { instructions, doc: { tags: tagIds, info, homework, test, startDate },
      props: { tags, students, lecture },
      state: { missing, errors }, } = this;

    return (
      <div className='ui basic segment'>

        <div className='ui vertical basic segment'>
          <TextField
            value={info}
            hintText='Informações'
            multiLine={true}
            rows={2}
            floatingLabelText='Informações'
            errorText={errors.info ? instructions.info : undefined}
            onChange={this.handleInfoChange} />
        </div>

        <PublicMiscTags form={this} tags={tags} error={errors.tags} />

        {moment().isAfter(startDate) ? undefined :
        <div className='ui vertical basic segment'>
          <Toggle
            label='Gerar dever de casa'
            onToggle={this.handleHomeworkChange}
            labelPosition='right'
            switched={homework || false}
            disabled={!_.isEmpty(test)}
            style={{ block: { maxWidth: 250 } } }/>
        </div>}

        <Divider />

        <div className='ui vertical basic segment'>
          <h4>Lançar presença</h4>
        </div>

        <div className='row'>
          <div className='six wide column'>
            <Semantic.Transitions component='div' className='ui relaxed big selection list'>
              {_.map(students, student =>
                <TeacherLectureAttendanceFormStudent
                  {...this.props}
                  active={_.includes(missing, student._id)}
                  student={student}
                  key={student._id}
                  onClick={this.handleStudentClick}
                />
              )}
            </Semantic.Transitions>
          </div>
        </div>

        <div className='ui divider' />
        <div className='row'>
          <div className='center aligned six wide column'>
            <div className='ui two small statistics'>
              <div className='statistic'>
                <div className='value'>{students.length - missing.length}</div>
                <div className='label'>Presentes</div>
              </div>
              <div className='statistic'>
                <div className='value'>{missing.length}</div>
                <div className='label'>Ausentes</div>
              </div>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='center aligned three wide column'>
            <Semantic.Button
              classes='blue'
              onClick={this.defaultSubmit}
            >Lançar</Semantic.Button>
          </div>
        </div>
      </div>
    );
  },
});

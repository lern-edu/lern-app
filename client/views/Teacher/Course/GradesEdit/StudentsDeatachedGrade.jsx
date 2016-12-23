import React from 'react';
import { Paper, TextField, RaisedButton } from 'material-ui';

TeacherGradesEditStudentsDeatachedGrade = React.createClass({

  // Static data

  instructions: { grade: 'Defina uma nota menor que o valor da atividade' },

  // Initial state

  getInitialState() {
    return { errors: {}, valid: null };
  },

  // Receive props

  componentWillMount() {
    this.receiveProps();
  },

  componentWillReceiveProps() {
    this.receiveProps();
  },

  receiveProps() {
    const { grades, deatachedGrade: { score, name } } = this.props;
    this.doc = {};
    _.forEach(grades, ({ _id }) =>
      this.doc[_id] = new Grades.DeatachedGradeSchema({ score, name }));
    this.updateValidators();
  },

  // Validators

  updateValidators() {
    const errors = {};
    let valid = true;
    _.forEach(this.doc, (deatachedGrade, id) => {
      deatachedGrade.validate(false);
      errors[id] = deatachedGrade.getValidationErrors();
      if (!_.isEmpty(errors[id]))
        valid = false;
    });
    this.setState({ errors, valid });
  },

  // Handlers

  handleGradeChange({ target: { value }, currentTarget }) {
    const deatachedGrade = _.get(this, `doc.${currentTarget
      .getAttribute('data-grade')}`);
    deatachedGrade.set('grade',
      _.isEmpty(value) ? null : value / deatachedGrade.get('score'));
    this.updateValidators();
  },

  handleSubmitDeatachedGrades() {
    const { course } = this.props;
    const deatachedGrades = this.doc;

    Meteor.call('TeacherGradesDeatachedGradesSave', deatachedGrades, (err, ok) => {
      if (err) snack('Problemas ao atualizar notas');
      else {
        snack('Notas atualizadas');
        FlowRouter.go('TeacherCourseShow',
          { courseId: _.get(course, '_id') },
          { active: 'grades' });
      };
    });
  },

  // render

  render() {
    const { students, grades, deatachedGrade } = this.props;
    const { errors, valid } = this.state;
    const { instructions } = this;

    return (
      <div className='ui vertical basic segment'>
        <p>Defina as notas das avaliações avulsas.</p>

        <div className='ui grid'>
          {_.map(grades, ({ student, _id }) =>
            <div className='sixteen wide column' key={_id}
              style={{ marginLeft: '1em', marginRight: '1em' }} >
              <Paper className='ui grid'>
                <div className='sixteen wide mobile eight wide computer column'>
                  <h4>{_.get(_.first(_.filter(students, s =>
                      s._id === student)), 'profile.name')}</h4>
                </div>
                <div className='sixteen wide mobile eight wide computer column'>
                  <TextField
                    hintText='Nota'
                    floatingLabelText='Nota'
                    errorText={_.get(errors, `${_id}.grade`) ? instructions.grade : undefined}
                    data-grade={_id}
                    onChange={this.handleGradeChange} />
                </div>
              </Paper>
            </div>
          )}
        </div>

        <div className='ui right aligned basic segment'>
          <RaisedButton
            label='Terminar'
            primary={true}
            disabled={!valid}
            onTouchTap={this.handleSubmitDeatachedGrades} />
        </div>
      </div>
    );
  },
});

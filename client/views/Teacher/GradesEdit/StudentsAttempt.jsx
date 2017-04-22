import React from 'react';
import { MenuItem, FontIcon, Paper, SelectField, RaisedButton } from 'material-ui';

TeacherGradesEditStudentsAttempt = React.createClass({

  // Initial state

  getInitialState() {
    const { grades, attempts } = this.props;
    const attemptsSelected = {};
    _.forEach(grades, g => {
      attemptsSelected[g.student] = _.get(_.first(_.filter(attempts, a =>
        _.includes(g.attempts, a._id))), '_id') || null;
    });
    return { attemptsSelected };
  },

  // handlers

  handleSelectAttempts() {
    const { grades, attempts } = this.props;
    const groupAttempts = _.groupBy(attempts, 'author');
    const { attemptsSelected } = this.state;

    _.forEach(attemptsSelected, (val, key) => {
      attemptsSelected[key] = _.get(_.first(_.sortBy(groupAttempts[key],
        'finishedAt')), '_id');
    });

    this.setState(attemptsSelected);
  },

  handleAttemptChange({ currentTarget }) {
    const { attemptsSelected } = this.state;
    attemptsSelected[currentTarget.getAttribute('data-student')] =
      currentTarget.getAttribute('data-attempt');
    this.setState(attemptsSelected);
  },

  handleSubmitAttempts() {
    const { attemptsSelected } = this.state;
    const { grades, course } = this.props;

    const gradesToSave = {};
    _.forEach(attemptsSelected, (val, key) => {
      if (val) gradesToSave[_.get(_.first(_.filter(grades, g =>
          g.student === key)), '_id')] = val;
    });

    Meteor.call('TeacherGradesAttemptSave', gradesToSave, (err, ok) => {
      if (err) snack('Problemas ao atualizar notas');
      else {
        snack('Notas atualizadas');
        FlowRouter.go('TeacherCourseShow',
          { courseId: _.get(course, '_id') },
          { active: 'grades' });
      };
    });
  },

  handleAttemptGo({ currentTarget }) {
    const { attempts } = this.props;
    const { params: { courseId } } = FlowRouter.current();
    const attempt = _.find(attempts,
      { _id: currentTarget.getAttribute('data-attempt') });
    FlowRouter.go('TeacherTestGrade',
      { courseId, attemptId: attempt._id, testId: attempt.test });
  },

  // Render

  render() {
    const { students, grades, attempts } = this.props;
    const { attemptsSelected } = this.state;
    const groupAttempts = _.groupBy(attempts, 'author');

    return (
      <div className='ui vertical basic segment'>
        <p>Selecione uma tentativa para cada aluno, lembre-se que cada aluno
        pode tentar resolver um teste mais de uma vez.</p>

        <div className='ui right aligned basic segment'>
          <RaisedButton
            label='Selecionar primeira tentativa para todos'
            secondary={true}
            onTouchTap={this.handleSelectAttempts} />
        </div>

        <div className='ui grid'>
          {_.map(grades, ({ student }) => {
            const { grade, score } = _.first(_.filter(attempts, a =>
              a._id === _.get(attemptsSelected, student))) || {};
            return <div className='sixteen wide column' key={student}
              style={{ marginLeft: '1em', marginRight: '1em' }} >
              <Paper className='ui grid'>
                <div className='sixteen wide mobile eight wide computer column'>
                  <h4>{_.get(_.first(_.filter(students, s =>
                      s._id === student)), 'profile.name')}</h4>
                </div>
                <div className='sixteen wide mobile eight wide computer column'>
                {_.get(groupAttempts, student) ? <SelectField
                    value={_.get(attemptsSelected, student)}
                    floatingLabelText='Tentativas'
                    hintText='Tentativas'
                    onChange={this.handleAttemptChange}>
                    {_.map(_.sortBy(_.get(groupAttempts, student), 'finishedAt'),
                    ({ _id, finishedAt, finished }, index) =>
                      <MenuItem
                        key={_id}
                        data-attempt={_id}
                        value={_id}
                        data-student={student}
                        secondaryText={moment(finishedAt)
                          .format('DD/MM HH:mm')}
                        primaryText={`Tentativa nº ${index + 1}`} />)}
                  </SelectField> : 'Nenhuma tentativa realizada'}
                </div>
                <div className='sixteen wide mobile eight wide computer column'>
                  {_.get(attemptsSelected, student) ? (!_.isNull(grade) ? (
                      `Nota: ${Math.round(score * grade)}`
                    ) : 'Correção pendente') : undefined}
                </div>
                <div className='sixteen wide mobile eight wide computer column'>
                  <RaisedButton
                    label='Corrigir tentativa'
                    data-attempt={_.get(attemptsSelected, student)}
                    disabled={!(_.get(attemptsSelected, student) &&
                      _.find(attempts, { _id: _.get(attemptsSelected, student), finished: false }))}
                    secondary={true}
                    onTouchTap={this.handleAttemptGo} />
                </div>
              </Paper>
            </div>;
          })}
        </div>

        <div className='ui right aligned basic segment'>
          <RaisedButton
            label='Terminar'
            disabled={_.every(attemptsSelected, a => _.isEmpty(a))}
            primary={true}
            onTouchTap={this.handleSubmitAttempts} />
        </div>
      </div>
    );
  },
});

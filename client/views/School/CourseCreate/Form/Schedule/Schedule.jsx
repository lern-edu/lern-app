import React from 'react';
import { IconButton, FontIcon, Paper } from 'material-ui';
import { ListItem, List, RaisedButton } from 'material-ui';
import { MenuItem, TimePicker, SelectField } from 'material-ui';

const SchoolCourseCreateFormSchedule = React.createClass({
  mixins: [AstroForm(Courses.DaySchema)],

  /* Handlers
  */

  handleWeekDayChange(event, index, day) {
    this.defaultHandler({ day }, { doc: true });
  },

  handleStartDateChange(event, startDate) {
    this.defaultHandler({ startDate: moment(startDate, 'H:m').toDate(),
      endDate: null, }, { doc: true });
  },

  handleEndDateChange(event, endDate) {
    this.defaultHandler({ endDate: moment(endDate, 'H:m').toDate() },
      { doc: true });
  },

  handleScheduleRemove(index) {
    const { form } = this.props;
    const schedule = form.doc.get('schedule');
    _.pullAt(schedule, index);
    form.defaultHandler({ schedule }, { doc: true });
    snack('Cronograma atualizado!');
  },

  handleSubmit() {
    const { form } = this.props;
    const schedule = form.doc.get('schedule') || [];
    schedule.push(_.clone(this.doc));
    form.defaultHandler({ schedule }, { doc: true });
    snack('Cronograma atualizado!');
    this.doc = new Courses.DaySchema();
    this.updateValidation();
  },

  /* Render
  */

  render() {
    const { valid, errors } = this.state;
    const { day, startDate, endDate } = this.doc;
    const { form, done } = this.props;
    const schedule = form.doc.get('schedule');

    return (
      <div className='ui basic segment' style={{ marginLeft: '5px' }} >
        <div className='ui grid'>

          <div className='row'>
            <SelectField
              value={day}
              errorText={_.get(errors, 'day')}
              floatingLabelText='Dia'
              onChange={this.handleWeekDayChange} >
              {_.map(WeekDays.all('keys'), k =>
                <MenuItem
                  key={k}
                  value={k}
                  primaryText={i18n.__(`WeekDays.${k}`)} />)}
            </SelectField>
          </div>

          <div className='row'>
            <TimePicker
              format='24hr'
              value={startDate}
              errorText={_.get(errors, 'startDate')}
              floatingLabelText='Hora de início'
              onChange={this.handleStartDateChange} />
          </div>

          <div className='row'>
            <TimePicker
              format='24hr'
              value={endDate}
              errorText={_.get(errors, 'endDate')}
              floatingLabelText='Hora de término'
              onChange={this.handleEndDateChange} />
          </div>

          <div className='row'>
            <RaisedButton
              label='Adicionar'
              disabled={!valid}
              primary={true}
              onTouchTap={this.handleSubmit} />
          </div>

          <Paper className='row'>
            <List style={{ width: '100%' }} >
              {_.map(WeekDays.all('keys'), k =>
                <ListItem
                  key={k}
                  primaryText={i18n.__(`WeekDays.${k}`)}
                  nestedItems={_.compact(_.map(schedule, (s, i) =>
                      !_.isEqual(s.day, k) ? undefined :
                      <ListItem
                        key={i}
                        primaryText={`Início: ${moment(s.startDate).format('LT')}`}
                        secondaryText={`Término: ${moment(s.endDate).format('LT')}`}
                        rightIcon={
                          <FontIcon
                            onTouchTap={() => this.handleScheduleRemove(i)}
                            className='material-icons' >delete</FontIcon>
                        }
                      />,
                  ))}
                 />
                )}
            </List>
          </Paper>

          <div className='row'>
            <RaisedButton
              label='Voltar'
              secondary={true}
              onTouchTap={form.prevStep}
              style={{ marginRight: '5px' }} />
            <RaisedButton
              label={'Terminar'}
              disabled={!done}
              primary={true}
              onTouchTap={form.defaultSubmit} />
          </div>

        </div>
      </div>
    );
  },
});

export default SchoolCourseCreateFormSchedule;

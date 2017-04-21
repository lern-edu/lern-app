// Libs
import React from 'react';
import { RaisedButton, DatePicker, TimePicker } from 'material-ui';

const TeacherLectureCreateFormDate = React.createClass({

  // Handlers

  handleStartDateChange(event, startDate) {
    this.props.form.defaultHandler({
      startDate,
      endDate: new Date(startDate).setHours(startDate.getHours() + 1),
    }, { doc: true });
  },

  handleEndDateChange(event, endDate) {
    this.props.form.defaultHandler({ endDate }, { doc: true });
  },

  // Date format

  formatDate(date) {
    return moment(date).format('DD/MM/YYYY');
  },

  /* Render
  */

  render() {
    const { errors, done, form } = this.props;
    const { endDate, startDate } = form.doc;

    const endDateMin = _.clone(startDate) || new Date();
    if (startDate) endDateMin.setHours(startDate.getHours());

    return (
      <div className='ui basic segment' style={{ marginLeft: '5px' }} >
        <div className='ui grid'>

          <div className='row'>
            <DatePicker
              value={startDate}
              errorText={_.get(errors, 'startDate')}
              formatDate={this.formatDate}
              floatingLabelText='Data de início'
              onChange={this.handleStartDateChange}
              minDate={new Date()}
            />
          </div>

          <div className='row'>
            <TimePicker
              format='24hr'
              value={startDate}
              errorText={_.get(errors, 'startDate')}
              floatingLabelText='Hora de início'
              onChange={this.handleStartDateChange}
            />
          </div>

          <div className='row'>
            <DatePicker
              value={endDate}
              disabled={!startDate}
              errorText={_.get(errors, 'endDate')}
              formatDate={this.formatDate}
              floatingLabelText='Data de término'
              onChange={this.handleEndDateChange}
              minDate={endDateMin}
            />
          </div>

          <div className='row'>
            <TimePicker
              format='24hr'
              value={endDate}
              errorText={_.get(errors, 'endDate')}
              floatingLabelText='Hora de término'
              onChange={this.handleEndDateChange}
            />
          </div>

          <div className='row'>
            <RaisedButton
              label='Terminar'
              disabled={!done}
              primary={true}
              onTouchTap={form.handleSubmit}
            />
          </div>

        </div>
      </div>
    );
  },
});

export default TeacherLectureCreateFormDate;

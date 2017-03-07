// Libs
import React from 'react';
import { RaisedButton } from 'material-ui';
import { DatePicker, TimePicker } from 'material-ui';

const SchoolCourseCreateFormTimeBounds = React.createClass({

  // Handlers

  handleStartDateChange(event, startDate) {
    this.props.form.defaultHandler({ startDate, endDate: null }, { doc: true });
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
    const { form, done, errors } = this.props;
    const { endDate, startDate } = form.doc;

    const endDateMin = _.clone(startDate) || new Date();
    if (startDate) endDateMin.setHours(startDate.getHours() + 1);

    return (
      <div className='ui basic segment' style={{ marginLeft: '5px' }} >
        <div className='ui grid'>

          <div className='row'>
            <DatePicker
              value={startDate}
              errorText={errors.startDate}
              formatDate={this.formatDate}
              floatingLabelText='Data de início'
              onChange={this.handleStartDateChange}
              minDate={new Date()} />
          </div>

          <div className='row'>
            <TimePicker
              format='24hr'
              value={startDate}
              errorText={errors.startDate}
              floatingLabelText='Hora de início'
              onChange={this.handleStartDateChange} />
          </div>

          <div className='row'>
            <DatePicker
              value={endDate}
              disabled={!startDate}
              errorText={errors.endDate}
              formatDate={this.formatDate}
              floatingLabelText='Data de término'
              onChange={this.handleEndDateChange}
              minDate={endDateMin} />
          </div>

          <div className='row'>
            <TimePicker
              format='24hr'
              value={endDate}
              errorText={errors.endDate}
              floatingLabelText='Hora de término'
              onChange={this.handleEndDateChange} />
          </div>

          <div className='row'>
            <RaisedButton
              label='Voltar'
              secondary={true}
              style={{ marginRight: 5 }}
              onTouchTap={form.prevStep} />
            <RaisedButton
              label='Próximo'
              disabled={!done}
              primary={true}
              onTouchTap={form.nextStep} />
          </div>

        </div>
      </div>
    );
  },
});

export default SchoolCourseCreateFormTimeBounds;

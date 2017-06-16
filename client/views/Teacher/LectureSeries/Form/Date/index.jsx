// Libs
import React from 'react';
import { RaisedButton, DatePicker, TimePicker } from 'material-ui';

export default class TeacherLectureEditFormDate extends React.Component {

  // Handlers

  handleStartDateChange(event, startDate) {
    this.setState({
      startDate,
      endDate: startDate,
    });
  }

  handleEndDateChange(event, endDate) {
    this.setState({ endDate });
  }

  // Date format

  formatDate(date) {
    return moment(date).format('DD/MM/YYYY');
  }

  /* Render
  */

  render() {
    const { parent, course } = this.props;
    const { endDate, startDate } = parent.state;

    const endDateMin = _.clone(startDate) || new Date();
    if (startDate) endDateMin.setHours(startDate.getHours());

    return (
      <div className='ui basic segment' style={{ marginLeft: '5px' }} >
        <div className='ui grid'>

          <div className='row'>
            <DatePicker
              value={startDate}
              formatDate={this.formatDate}
              floatingLabelText='Data de início'
              onChange={this.handleStartDateChange.bind(parent)}
              minDate={course.startDate}
            />
          </div>

          <div className='row'>
            <DatePicker
              value={endDate}
              formatDate={this.formatDate}
              floatingLabelText='Data de término'
              onChange={this.handleEndDateChange.bind(parent)}
              minDate={startDate}
              maxDate={course.endDate}
            />
          </div>

          <div className='row'>
            <RaisedButton
              label='Próximo'
              primary={true}
              onTouchTap={parent.nextStep.bind(parent)}
            />
          </div>

        </div>
      </div>
    );
  }

};

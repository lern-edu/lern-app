// Libs
import React from 'react';
import { AutoComplete, MenuItem, RaisedButton, Toggle } from 'material-ui';
import { DatePicker, TimePicker } from 'material-ui';

const SchoolTestFormApplicationView = React.createClass({

  // Handlers

  handleCourse({ value }, index) {
    const course = _.get(value, 'key');
    if (!course) return;
    this.props.form.defaultHandler({ course }, { doc: true });
    this.props.form.setState({ noCourse: false });
  },

  handleScores(event, scored) {
    const { form } = this.props;
    form.setState({ scored });
    form.updateValidation();
  },

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
    const { form, done, errors, courses } = this.props;
    const { noCourse, scored } = form.state;
    const { endDate, startDate, course } = form.doc;

    const endDateMin = _.clone(startDate) || new Date();
    if (startDate) endDateMin.setHours(startDate.getHours() + 1);

    return (
      <div className='ui basic segment' style={{ marginLeft: '5px' }} >
        <div className='ui grid'>

          <div className='row'>
            {
              course
              ? <p><b>Curso selecionado: </b>{_.get(_.find(courses, { _id: course }), 'name')}</p>
              : undefined
            }
          </div>

          <div className='row'>
            <AutoComplete
                onNewRequest={this.handleCourse}
                floatingLabelText='Curso'
                filter={AutoComplete.fuzzyFilter}
                menuStyle={{ width: '500px' }}
                targetOrigin={{ vertical: 'top', horizontal: 'left' }}
                dataSource={_.map(courses, ({ _id, name, alias }) =>
                    _.zipObject(['text', 'value'], [
                      name,
                      <MenuItem
                        key={_id}
                        primaryText={name}
                        secondaryText={alias}
                        innerDivStyle={{ width: '500px' }} />,
                    ])
                  )
                }
              />
          </div>

          <div className='row'>
            <Toggle
              toggled={scored}
              label='Teste pontuado?'
              onToggle={this.handleScores}
              style={{ marginBottom: 16 }} />
          </div>

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

export default SchoolTestFormApplicationView;

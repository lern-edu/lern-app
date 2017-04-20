import React from 'react';
import { Paper, DatePicker, FlatButton } from 'material-ui';

TeacherTestCreateFormDate = React.createClass({

  // Static Data

  instructions: {
    startDate: 'Defina uma data de início',
    endDate: 'Defina uma data de Término',
  },

  // handlers

  handleStartDateChange(event, startDate) {
    this.props.form.defaultHandler({ startDate, endDate: null }, { doc: true });
  },

  handleEndDateChange(event, endDate) {
    this.props.form.defaultHandler({ endDate }, { doc: true });
  },

  handleNext() {
    FlowRouter.setQueryParams({ tab: 'time' });
  },

  // Render

  render() {
    const { instructions, props: {
      styles: { paper, subItems, next },
      form: {
        state: { errors },
        doc: { startDate, endDate },
      },
    }, } = this;

    return (
      <Paper {...paper}>

        <div {...subItems}>
          <h5>Quando acontecerá o teste?</h5>
        </div>

        <div {...subItems}>
          <DatePicker
            hintText='Início'
            floatingLabelText='Início'
            errorText={errors.startDate ? instructions.startDate : null}
            onChange={this.handleStartDateChange}
            formatDate={d => moment(d).format('DD/MM/YYYY')}
            autoOk={true}
            value={startDate}
            wordings={{ ok: 'OK', cancel: 'Cancelar' }}
            minDate={new Date()} />
        </div>

        <div {...subItems}>
          <DatePicker
            hintText='Término'
            floatingLabelText='Término'
            errorText={errors.endDate ? instructions.endDate : null}
            onChange={this.handleEndDateChange}
            autoOk={true}
            formatDate={d => moment(d).format('DD/MM/YYYY')}
            disabled={!startDate}
            value={endDate}
            wordings={{ ok: 'OK', cancel: 'Cancelar' }}
            minDate={startDate || new Date()} />
        </div>

        <div className='ui basic segment'>
          <div {...next}>
            <FlatButton
              label='Próximo'
              disabled={!_.every(_.keys(errors), e => !_.includes(['startDate', 'endDate'], e))}
              primary={true}
              onTouchTap={this.handleNext} />
          </div>
        </div>

      </Paper>
    );
  },
});

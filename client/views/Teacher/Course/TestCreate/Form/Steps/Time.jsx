import React from 'react';
import { Paper, SelectField, MenuItem, Slider, FlatButton } from 'material-ui';

TeacherTestCreateFormTime = React.createClass({

  // Static Data

  instructions: {
    timeout: 'Defina um cronômetro e um tempo',
  },

  // handlers

  handleTimeTypeChange(event, index, timeoutType) {
    const timeout = timeoutType === 'none' ? null : _.get(this, 'doc.timeout');
    this.props.form.defaultHandler({ timeoutType, timeout },
      { doc: true });
  },

  handleTimeoutChange(event, timeout) {
    this.props.form.defaultHandler({ timeout: timeout * 60 }, { doc: true });
  },

  handleNext() {
    FlowRouter.setQueryParams({ tab: 'questions' });
  },

  // Render

  render() {
    const { instructions, props: {
      styles: { paper, subItems, next },
      form: {
        state: { errors },
        doc: { timeoutType, timeout },
      },
    }, } = this;

    return (
      <Paper {...paper}>

        <div {...subItems}>
          <h5>Defina como será distribuído o tempo para a realização do teste e
          quanto tempo para a resolução.</h5>
        </div>

        <div {...subItems}>
          <SelectField
            value={timeoutType}
            errorText={errors.timeoutType || errors.timeout ?
              instructions.timeout : null}
            onChange={this.handleTimeTypeChange}
            floatingLabelText='Tipo de cronometragem' >
            {_.map(TestTimeoutTypes.all('keys'), tt =>
              <MenuItem
                key={tt}
                value={tt}
                primaryText={TestTimeoutTypes.getName(tt)}/>)}
         </SelectField>
        </div>

        <div {...subItems}>
          <Slider step={1} min={0} max={180}
            disabled={_.isEqual(timeoutType, 'none')}
            onChange={this.handleTimeoutChange}
            description={timeoutType ?
              `Tempo ${TestTimeoutTypes.getName(timeoutType)} de ${
                timeout / 60 || 0} minutos` : null}/>
        </div>

        <div className='ui basic segment'>
          <div {...next}>
            <FlatButton
              label='Próximo'
              disabled={!_.every(_.keys(errors), e => !_.includes(['timeout', 'timeoutType'], e))}
              primary={true}
              onTouchTap={this.handleNext} />
          </div>
        </div>

      </Paper>
    );
  },
});

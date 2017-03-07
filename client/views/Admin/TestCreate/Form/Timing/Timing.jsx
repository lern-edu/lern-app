// Libs
import React from 'react';
import { SelectField, MenuItem, RaisedButton, TextField } from 'material-ui';

const AdminTestCreateFormTiming = React.createClass({

  // Handlers

  handleTimeoutTypeChange(event, index, timeoutType) {
    this.props.form.defaultHandler({ timeoutType }, { doc: true });
    const pages = this.props.form.doc.get('pages');
    _.forEach(pages, p => p.set('timeout', timeoutType != 'page' ? null : ''));
    this.props.form.defaultHandler({ pages }, { doc: true });
  },

  handleTimeoutChange({ currentTarget }, value) {
    const field = currentTarget.getAttribute('name');
    const timeout = parseInt(value);
    if (timeout || value == '')
      this.props.form.defaultHandler({ [field]: timeout }, { doc: true });
    else return;
  },

  /* Render
  */

  render() {
    const { form, done, errors } = this.props;

    return (
      <div className='ui basic segment' style={{ marginLeft: '5px' }} >
        <div className='ui grid'>

          <div className='row'>
            <SelectField
              floatingLabelText='Cronômetro'
              value={form.doc.get('timeoutType')}
              errorText={errors.timeoutType}
              onChange={this.handleTimeoutTypeChange} >
              {_.map(TestTimeoutTypes.all('both'), (v, k) =>
                <MenuItem key={k} value={k} primaryText={v} />)}
            </SelectField>
          </div>

          <div className='row'>
            {form.doc.get('timeoutType') == 'global' ?
              <TextField
                value={form.doc.get('timeout') || ''}
                floatingLabelText='Segundos'
                errorText={errors.timeout}
                name='timeout'
                onChange={this.handleTimeoutChange} /> : undefined}
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

export default AdminTestCreateFormTiming;

import React from 'react';
import PropTypes from 'prop-types';
import { Paper, SelectField, MenuItem, TextField, FlatButton } from 'material-ui';

StudentSettingsProfile = React.createClass({

  /* Get Context
  */

  contextTypes: {
    user: PropTypes.object,
  },

  // Initial state

  getInitialState() {
    return { name: _.get(this, 'context.user.profile.name') };
  },

  // Handlers

  handleChange({ target: { textContent } }, index, school) {
    Meteor.call('UserSchoolSave', { school }, (doc) =>
      snack('Estou na escola ' + textContent));
  },

  handleNameChange({ target: { value: name } }) {
    this.setState({ name });
  },

  handleSaveChanges() {
    const { name } = this.state;
    if (_.get(name, 'length') < 5)
      snack('Digite seu nome completo');
    else
      Meteor.call('UserUpdateProfileName', name, () => snack('Nome atualizado!'));
  },

  // Render

  render() {
    const { context: { user: { profile: { school } } },
      props: { schools },
      state: { name }, } = this;
    return (
      <Paper className='ui basic segment'>

        {!schools || _.isEqual(_.get(schools, 'length'), 1) ? undefined :
          <div className='ui vertical basic segment'>
            <SelectField
              value={school}
              onChange={this.handleChange}
              floatingLabelText='Em qual escola estou?' >
              {_.map(schools, ({ _id, profile: { name } }) =>
              <MenuItem key={_id} value={_id} primaryText={name} />)}
            </SelectField>
          </div>}

          <div className='ui vertical basic segment'>
            <TextField
              onChange={this.handleNameChange}
              fullWidth={true}
              floatingLabelText='Nome Completo'
              value={name} />
          </div>

          <div className='ui right aligned basic segment'>
            <FlatButton
              label='Salvar'
              primary={true}
              onTouchTap={this.handleSaveChanges}/>
          </div>

      </Paper>
    );
  },
});

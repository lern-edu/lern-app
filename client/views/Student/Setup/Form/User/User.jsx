// Libs
import React from 'react';
import { SelectField, MenuItem } from 'material-ui';
import { RaisedButton, TextField } from 'material-ui';

// Views
import StudentSetupFormUserEmails from './Emails.jsx';

const StudentSetupFormUser = React.createClass({
  mixins: [AstroForm(Meteor.users.ProfileSchema)],

  // Handlers

  handleTextChange({ currentTarget }, value) {
    this.defaultHandler({ [currentTarget.getAttribute('name')]: value }, { doc: true });
    this.defaultHandler({
      name: `${this.doc.get('firstName')} ${this.doc.get('lastName')}`,
    }, { doc: true });
  },

  handleGenderChange(event, index, gender) {
    this.defaultHandler({ gender }, { doc: true });
  },

  /* Render
  */

  render() {
    const { index, valid, errors } = this.state;
    const { form } = this.props;

    return (
      <div>

        <div className='row'>
          <TextField
            value={this.doc.get('name')}
            floatingLabelText='Nome completo'
            name='name'
            errorText={_.get(errors, 'name')}
            disabled={true}  />
        </div>

        <div className='row'>
          <TextField
            value={this.doc.get('firstName') || ''}
            floatingLabelText='Primeiro nome'
            name='firstName'
            errorText={_.get(errors, 'firstName')}
            onChange={this.handleTextChange}  />
        </div>

        <div className='row'>
          <TextField
            value={this.doc.get('lastName') || ''}
            floatingLabelText='Sobrenome'
            name='lastName'
            errorText={_.get(errors, 'lastName')}
            onChange={this.handleTextChange}  />
        </div>

        <SelectField floatingLabelText="Gênero"
          value={this.doc.get('gender')}
          onChange={this.handleGenderChange} >
          <MenuItem value='male' primaryText={i18n.__(`UserGender.male`)} />
          <MenuItem value='female' primaryText={i18n.__(`UserGender.female`)} />
        </SelectField>

        <div className='row'>
          <StudentSetupFormUserEmails emails={form.doc.get('emails')} form={form} />
        </div>

      </div>
    );
  },
});

export default StudentSetupFormUser;

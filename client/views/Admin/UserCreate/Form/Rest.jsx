import React from 'react';
import { RaisedButton, TextField, DropDownMenu } from 'material-ui';
import { MenuItem, FlatButton, CircularProgress } from 'material-ui';

const AdminUserCreateFormRest = React.createClass({

  // Handlers

  handleSchoolTypeChange(event, index, schoolType) {
    this.props.form.defaultHandler({ schoolType }, { doc: true });
  },

  handleSchoolChange(event, index, school) {
    this.props.form.defaultHandler({ school }, { doc: true });
  },

  handleInput({ currentTarget, target: { value } }) {
    this.props.form.defaultHandler({
      [currentTarget.getAttribute('name')]: value, }, { doc: true });
  },

  handleSubmit() {
    const { form, form: { doc } } = this.props;
    if (_.includes(['teacher', 'student'], doc.get('role')) && doc.get('school'))
      doc.set('schools', [doc.get('school')]);
    form.handleSubmit();
  },

  /* Render
  */

  render() {
    const { ready, form, schools } = this.props;
    const { valid, waitingCallback } = form.state;

    const role = form.doc.get('role');
    const teacherAndStudentView = [
      <div className='row' key='school'>
        {(!ready.schools && !schools.length) ? <CircularProgress /> :
          <DropDownMenu
            value={form.doc.get('school')}
            onChange={this.handleSchoolChange} >
            {_.map(schools, school =>
              <MenuItem
                key={school._id}
                value={school._id}
                primaryText={school.getName()}
                secondaryText={SchoolTypes.getName(school.profile.schoolType)}
              />)}
          </DropDownMenu>}
      </div>,
      <div className='row' key='cpf'>
        <TextField
          value={form.doc.get('cpf') || ''}
          floatingLabelText='CPF'
          name='cpf'
          errorText={_.get(form.state.errors, 'cpf')}
          onInput={this.handleInput} />
      </div>,
    ];

    return (
      <div className='ui centered grid'>

        {_.get({
            school: [
              <div className='row' key='schoolType'>
                <DropDownMenu
                  value={form.doc.get('schoolType') || ''}
                  onChange={this.handleSchoolTypeChange} >
                  {_.map(SchoolTypes.all('both'), (v, k) =>
                    <MenuItem value={k} key={k} primaryText={v} />)}
                </DropDownMenu>
              </div>,
              <div className='row' key='cnpj'>
                <TextField
                  value={form.doc.get('cpnj')}
                  floatingLabelText='CNPJ'
                  name='cnpj'
                  errorText={_.get(form.state.errors, 'cnpj')}
                  onInput={this.handleInput} />
              </div>,
            ],
            student: teacherAndStudentView,
            teacher: teacherAndStudentView,
          }, form.doc.get('role'))}

        <div className='row'>
          <FlatButton
            label='Voltar'
            onTouchTap={form.prevStep}
            style={{ marginRight: '5px' }} />
          <RaisedButton
            label={'Terminar'}
            disabled={!valid || waitingCallback}
            primary={true}
            onTouchTap={this.handleSubmit} />
        </div>

      </div>
    );
  },
});

export default AdminUserCreateFormRest;

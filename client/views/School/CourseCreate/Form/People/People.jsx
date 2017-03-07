// Libs
import React from 'react';
import { AutoComplete, MenuItem, RaisedButton } from 'material-ui';
import { DatePicker, TimePicker, Avatar, Chip } from 'material-ui';

const SchoolCourseCreateFormPeopleView = React.createClass({

  // Lifecycle

  contextTypes: {
    user: React.PropTypes.object,
  },

  // Handlers

  handleTeachersAdd({ value }, index) {
    const teacher = _.get(value, 'key');
    if (!teacher) return;
    const teachers = this.props.form.doc.get('teachers') || [];
    teachers.push(teacher);
    this.props.form.defaultHandler({ teachers }, { doc: true });
  },

  handleTeachersDelete(teacher) {
    const teachers = this.props.form.doc.get('teachers');
    _.pull(teachers, teacher);
    this.props.form.defaultHandler({ teachers }, { doc: true });
  },

  handleStudentsAdd(value, index) {
    const student = _.get(value, 'value');
    if (!student) return;
    const students = this.props.form.doc.get('students') || [];
    students.push(student);
    this.props.form.defaultHandler({ students }, { doc: true });
  },

  handleStudentsDelete(student) {
    const students = this.props.form.doc.get('students');
    _.pull(students, student);
    this.props.form.defaultHandler({ students }, { doc: true });
  },

  /* Render
  */

  render() {
    const { form, done, errors, teachers, students } = this.props;
    const { user } = this.context;

    return (
      <div className='ui basic segment' style={{ marginLeft: '5px' }} >
        <div className='ui grid'>

          <div className='row'>
            <AutoComplete
              onNewRequest={this.handleTeachersAdd}
              floatingLabelText='Professores'
              filter={AutoComplete.fuzzyFilter}
              menuStyle={{ width: '500px' }}
              errorText={_.get(errors, 'teachers')}
              targetOrigin={{ vertical: 'top', horizontal: 'left' }}
              dataSource={_.map(_.filter(_.union(teachers, [user]),
                  ({ _id }) => !_.includes(form.doc.get('teachers'), _id)
                ), ({ _id, profile: { name }, roles }) =>
                  _.zipObject(['text', 'value'], [
                    name,
                    <MenuItem
                      key={_id}
                      primaryText={name}
                      secondaryText={_.union(_.map(roles, r =>
                        i18n.__(`UserRoles.${r}`)), ', ')}
                      innerDivStyle={{ width: '500px' }} />,
                  ])
                )} />
          </div>

          <div className='row'>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {_.map(_.filter(_.union(teachers, [user]), ({ _id }) =>
                  _.includes(form.doc.get('teachers'), _id)
                ), ({ profile: { name, profilePic }, _id }) =>
                <Chip
                  key={_id}
                  style={{ margin: 4 }}
                  onRequestDelete={() => this.handleTeachersDelete(_id)} >
                  {profilePic ? <Avatar src={profilePic} /> :
                    <Avatar size={32}>{_.first(name)}</Avatar>}
                  {name}
                </Chip>
              )}
            </div>
          </div>

          <div className='row'>
            <AutoComplete
              onNewRequest={this.handleStudentsAdd}
              floatingLabelText='Alunos'
              filter={AutoComplete.fuzzyFilter}
              errorText={_.get(errors, 'students')}
              menuStyle={{ width: '500px' }}
              targetOrigin={{ vertical: 'top', horizontal: 'left' }}
              dataSource={_.map(students,
                ({ _id, profile: { name }, roles }) =>
                  _.zipObject(['text', 'value'], [name, _id])
                )} />
          </div>

          <div className='row'>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {_.map(_.filter(students, ({ _id }) =>
                  _.includes(form.doc.get('students'), _id)
                ), ({ profile: { name, profilePic }, _id }) =>
                <Chip
                  key={_id}
                  style={{ margin: 4 }}
                  onRequestDelete={() => this.handleStudentsDelete(_id)} >
                  {profilePic ? <Avatar src={profilePic} /> :
                    <Avatar size={32}>{_.first(name)}</Avatar>}
                  {name}
                </Chip>
              )}
            </div>
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

export default SchoolCourseCreateFormPeopleView;

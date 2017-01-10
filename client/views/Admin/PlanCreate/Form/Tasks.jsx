import React from 'react';
import { MenuItem, TextField, Checkbox, } from 'material-ui';
import { RaisedButton, Dialog, DatePicker, FlatButton, AutoComplete } from 'material-ui';

const AdminPlanCreateFormTasks = React.createClass({

  // Static Data

  instructions: {
    subject: 'Selecione uma matéria',
    size: 'Defina quantidade de questões até 300',
  },

  // Initial state

  getInitialState() {
    return {
      errors: undefined,
      valid: undefined,
    };
  },

  // Will mount

  componentWillMount() {
    this.doc = new Plans.TaskSchema();
  },

  // Will receive props

  componentWillReceiveProps({ day }) {
    this.doc.set({ day, subject: null, size: null });
    this.updateValidation();
  },

  // Handlers

  handleSubjectChange({ value: { key: subject } }, index) {
    this.doc.set({ subject });
    this.updateValidation();
  },

  handleSizeChange(event) {
    this.doc.set({ size: parseInt(event.target.value) });
    this.updateValidation();
  },

  handleMistakesChange(event) {
    this.doc.set({ mistakes: event.target.checked });
    this.updateValidation();
  },

  handleNewTask() {
    this.props.handleTask(this.doc);
  },

  // update

  updateValidation() {
    this.setState({
      valid: this.doc.validate(false),
      errors: this.doc.getValidationErrors(),
    });
  },

  // render

  render() {
    const { subjects, handleClose, open=false, day } = this.props;
    const { errors, valid } = this.state;
    const { mistakes } = this.doc;
    const { instructions } = this;

    const actions = [
      <FlatButton
        label='Ok'
        primary={true}
        disabled={!valid}
        onTouchTap={this.handleNewTask}
      />,
      <FlatButton
        label='Cancelar'
        secondary={true}
        onTouchTap={handleClose}
      />,
    ];

    return (
      <Dialog
        title={`Tarefa para ${WeekDays.getName(day)}`}
        actions={actions}
        modal={false}
        open={open}
        onRequestClose={this.handleClose} >
          <div className='row'>
            <AutoComplete
              floatingLabelText='Matéria'
              filter={AutoComplete.fuzzyFilter}
              onNewRequest={this.handleSubjectChange}
              disableFocusRipple={false}
              errorText={errors && errors.subject ? instructions.subject : undefined}
              dataSource={_.map(subjects, s => _.zipObject(['text', 'value'], [
                s.name,
                <MenuItem
                  primaryText={s.name}
                  secondaryText={SubjectAreas.getName(s.area)}
                  key={s._id} />,
                ])
              )} />
          </div>
          <div className='row'>
            <TextField
              hintText='Tamanho'
              floatingLabelText='Tamanho'
              errorText={errors && errors.size ? instructions.size : undefined}
              onChange={this.handleSizeChange} />
          </div>
          <div className='row'>
            <Checkbox
              label='Apenas erros do aluno'
              checked={mistakes}
              onCheck={this.handleMistakesChange}
            />
          </div>
      </Dialog>
    );
  },
});

export default AdminPlanCreateFormTasks;

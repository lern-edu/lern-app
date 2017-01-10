// Libs
import React from 'react';
import { Paper, TextField, List, ListItem, FontIcon, RaisedButton } from 'material-ui';

// Views
import AdminPlanCreateFormTasks from './Tasks.jsx';

AdminPlanCreateForm = React.createClass({
  mixins: [AstroForm(Plans.Schema, 'AdminPlanSave')],

  // Static Data
  instructions: {
    name: 'Redija um nome com 4 ou mais letras',
  },

  /* Lifecycle
  */

  getInitialState() {
    return { open: false, day: null };
  },

  /* Handlers
  */

  handleNameChange(event) {
    this.defaultHandler({ name: event.target.value }, { doc: true });
  },

  handleTaskModal(event) {
    this.setState({ day: event.currentTarget.getAttribute('data-key') });
    this.handleToggleModalState();
  },

  handleNewTask(task) {
    let { weekJobs } = this.doc;
    if (!weekJobs) weekJobs = [];
    weekJobs.push(task);
    this.defaultHandler({ weekJobs }, { doc: true });
    this.handleToggleModalState();
  },

  handleToggleModalState() {
    this.setState({ open: !this.state.open });
  },

  handleTaskRemove(event) {
    const { weekJobs } = this.doc;
    const day = event.currentTarget.getAttribute('data-day');
    const subject = event.currentTarget.getAttribute('data-subject');
    _.pullAt(weekJobs,
      _.findIndex(weekJobs, t => t.subject === subject && t.day === day));
    this.defaultHandler({ weekJobs }, { doc: true });
  },

  handleSubmitSuccess({ _id }) {
    console.log(`Plan created: ${_id}`);
    snack('Plano criado');
    FlowRouter.go('AdminPlans');
  },

  /* Render
  */

  render() {
    const { subjects } = this.props;
    const { name, weekJobs } = this.doc;
    const { valid, errors, day, open } = this.state;
    const { instructions } = this;

    return (
      <div className='ui basic segment'>

        <div className='row'>
          <h2>Criar Plano</h2>
        </div>

        <div className='ui vertical basic segment'>
          <TextField
            hintText='Nome'
            floatingLabelText='Nome'
            value={name || ''}
            errorText={errors.name ? instructions.name : undefined}
            onChange={this.handleNameChange} />
        </div>

        <div className='ui vertical basic segment'>
          <h4>Criar tarefas</h4>
        </div>

        <Paper className='ui vertical basic segment'>
          <List>
            {_.map(WeekDays.all('keys'), day =>
              <ListItem
                key={day}
                primaryText={WeekDays.getName(day)}
                nestedItems={_.union(_.map(_.filter(weekJobs, task =>
                    task.day == day), (t, index) =>
                      <ListItem
                      key={`${t.subject}-${index}`}
                      data-day={day}
                      data-subject={t.subject}
                      primaryText={_.get(_.first(_.filter(subjects, s =>
                        s._id === t.subject)), 'name')}
                      secondaryText={`${t.size} questões`}
                      rightIcon={<FontIcon className='material-icons'>
                        delete</FontIcon>}
                      onTouchTap={this.handleTaskRemove}
                    />), [<ListItem
                    key='add'
                    data-key={day}
                    primaryText='Adicionar tarefa'
                    onTouchTap={this.handleTaskModal}
                    rightIcon={<FontIcon className='material-icons'>
                      add</FontIcon>}
                  />,
                ])}
              />
            )}
          </List>
        </Paper>

        <div className='ui vertical basic segment'>
          <AdminPlanCreateFormTasks
          open={open}
          day={day}
          subjects={subjects}
          handleTask={this.handleNewTask}
          handleClose={this.handleTaskModal}/>
        </div>

        <div className='ui right aligned basic segment'>
          <RaisedButton
            label='Terminar'
            disabled={valid ? false : true}
            primary={true}
            onTouchTap={this.defaultSubmit} />
        </div>

      </div>
    );
  },
});

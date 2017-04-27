import React from 'react';
import { Paper, TextField, RaisedButton } from 'material-ui';

StudentSettingsCourse = React.createClass({
  /* Lifecycle
  */

  getInitialState() {
    return { course: undefined };
  },

  /* Handlers
  */

  handleInputChange({ target }) {
    const { value, name } = target;
    this.setState({ [name]: value });
  },

  handleSubmit() {
    const { state: { course }, props: { user } } = this;

    FlowRouter.go('StudentCourseIngress', {}, { alias: course });

    // Meteor.call('StudentCourseIngress', course.trim(), (err, c) => {
    //   if (err) snack('O curso não foi encontrado');
    //   else FlowRouter.go('StudentCourseShow', { courseId: c._id });
    // });
  },

  /* Render
  */

  render() {
    const { state: { course }, props: { user } } = this;

    return (
      <Paper className='ui basic segment'>
        <div className='ui header'>Entrar em um curso</div>
        {_.get(user, 'profile.tutorial') ? <p><strong>
          Percebemos que você é novo por aqui... adicione a chave para entrar em um curso
        </strong></p> : undefined}
        <div>
          <TextField
            value={course}
            hintText='Chave de acesso'
            onChange={this.handleInputChange}
            name='course'
          />
        </div>
        <div>
        {_.get(user, 'profile.tutorial') ?
          <RaisedButton
            style={{ marginRight: '5px' }}
            label='Pular'
            secondary={true}
            onClick={() => FlowRouter.go(user.getHomeRoute())}
          /> : undefined}
          <RaisedButton
            disabled={!course}
            label='Entrar'
            primary={true}
            onClick={this.handleSubmit}
          />
        </div>
      </Paper>
    );
  },
});

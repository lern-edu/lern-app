import React from 'react';
import { Card, CardTitle, CardText, TextField, FlatButton, CardActions } from 'material-ui';

TeacherSettingsSecurity = React.createClass({
  /* Lifecycle
  */

  getInitialState() {
    return { current: undefined, target: undefined };
  },

  /* Handlers
  */

  handleInputChange({ target }) {
    const { value, name } = target;
    this.setState({ [name]: value });
  },

  handleSubmit() {
    const { current, target } = this.state;
    Accounts.changePassword(current, target, err => {
      if (err) {
        console.log(err);
        snack('Erro inesperado', 'orange warning');
      } else {
        this.setState({ current: undefined, target: undefined });
        snack('Senha trocada', 'green checkmark');
      }
    });
  },

  /* Render
  */

  render() {
    const { target, current } = this.state;

    return (
      <Card>
        <CardTitle title='Trocar senha' />
        <CardText>

          <div className='row' >
            <TextField
              value={current}
              hintText='Senha atual'
              type='password'
              onChange={this.handleInputChange}
              name='current'
            />
          </div>

          <div className='row' >
            <TextField
              value={target}
              hintText='Nova senha'
              type='password'
              onChange={this.handleInputChange}
              name='target'
            />
          </div>

        </CardText>

        <CardActions>
          <FlatButton
            disabled={!(target && current)}
            label='Trocar'
            primary={true}
            onClick={this.handleSubmit}
          />
        </CardActions>

      </Card>
    );
  },
});

import React from 'react';
import i18n from 'meteor/universe:i18n';
import { Dialog, FlatButton, TextField } from 'material-ui';

const PublicLoginRegister = React.createClass({
  mixins: [AstroForm(Meteor.users.FormSchema, 'PublicUserCreate')],

  /* Lifecycle
  */

  getInitialState() {
    return { index: 0, waitingCallback: false };
  },

  /* Handlers
  */

  handlePressEnter(event) {
    if (event.keyCode == 13) this.handleSubmit();
  },

  handleSubmit() {
    this.setState({ waitingCallback: true });
    this.defaultSubmit();
  },

  handleSubmitError(e1, e2) {
    this.setState({ waitingCallback: false });
    snack('Problemas ao cadastrar!');
    this.props.handleClose();
  },

  handleSubmitSuccess({ _id }) {
    this.setState({ waitingCallback: false });
    console.log(`User created: ${_id}`);
    snack('Verifique seu email para completar o cadastro');
    this.props.handleClose();
  },

  handleChange({ target: { value }, currentTarget }, id) {
    this.defaultHandler({ [currentTarget.getAttribute('data-key')]: value }, { doc: true });
  },

  // render

  render() {
    const { state: { errors, valid }, props: { handleClose, open } } = this;

    return (
      <Dialog
        title='Cadastrar'
        open={open}
        modal={true}
        actions={[
          <FlatButton
            label='Cadastrar'
            primary={true}
            disabled={!valid}
            onTouchTap={this.handleSubmit} />,
          <FlatButton
            label='Cancelar'
            onTouchTap={handleClose} />,
        ]}
        onRequestClose={handleClose} >
        <div className='row'>
          <TextField
            hintText='Email'
            data-key='email'
            errorText={_.get(errors, 'email')}
            floatingLabelText='Email'
            onInput={this.handleChange}
            onKeyDown={this.handlePressEnter}
          />
        </div>

        <div className='row'>
          <TextField
            hintText='Nome'
            data-key='name'
            errorText={_.get(errors, 'name')}
            floatingLabelText='Nome'
            onInput={this.handleChange}
            onKeyDown={this.handlePressEnter}
          />
        </div>
      </Dialog>
    );
  },

});

export default PublicLoginRegister;

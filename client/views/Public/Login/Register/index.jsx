import React from 'react';
import { Dialog, FlatButton, TextField, Tabs, Tab } from 'material-ui';

PublicHomeRegister = React.createClass({

  // Initial State

  getInitialState() {
    return { name: '', email: '', valid: true, text: '', type: 'student' };
  },

  // Handlers

  handleActive({ props: { type } }) {
    this.setState({ type });
  },

  handleChange({ target: { value }, currentTarget }, id) {
    this.setState({ [currentTarget.getAttribute('data-key')]: value });
    this.setState({ valid: this.validator() });
  },

  handleSubmit() {
    const { props: { handleClose }, state: { email, name, text, type } } = this;
    if (!_.every(this.validator())) {
      snack('Preencha os campos corretamente');
      return;
    };

    if (_.isEqual(type, 'student'))
      Meteor.call('PublicStudentRegister', { email, name }, (err) => {
        console.log(err);
        if (!err) {
          snack('Vá até o link de verificação em seu email');
        } else {
          if (err.reason.includes('not found'))
            snack('Não encontramos o email especificado');
          else if (err.reason.includes('already exists'))
            snack('Esse email já está cadastrado');
          else snack('Erro! Entre em contato com nossa equipe');
        };

        handleClose();
      });
    else Meteor.call('PublicSendEmail', { email, text }, (err) => {
      if (err) console.log(err);
      else {
        snack('Obrigado!');
        this.setState({ email: '', text: '' });
        handleClose();
      };
    });
  },

  // Validator

  validator() {
    const { email, name, type } = this.state;
    const filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return {
      email: filter.test(email),
      name: _.isEqual(type, 'teacher') || (name.length > 4 && name.indexOf(' ') != -1),
    };
  },

  // Render

  render() {
    const { verify, handleClose } = this.props;
    const { valid } = this.state;
    return (
      <Dialog
        title='Novo usuário'
        open={verify}
        modal={true}
        actions={[
          <FlatButton
            label='Cadastrar'
            primary={true}
            disabled={!_.every(valid)}
            onTouchTap={this.handleSubmit} />,
          <FlatButton
            label='Cancelar'
            onTouchTap={handleClose} />,
        ]}
        onRequestClose={handleClose} >
        <Tabs>
          <Tab label='Aluno' type='student' onActive={this.handleActive} >
            <div className='row'>
              <TextField
                hintText='Nome completo'
                data-key='name'
                errorText={valid.name ? undefined : 'Digite nome e sobrenome'}
                floatingLabelText='Nome completo'
                onInput={this.handleChange} />
            </div>
            <div className='row'>
              <TextField
                hintText='Email'
                data-key='email'
                errorText={valid.email ? undefined : 'Digite um email válido'}
                floatingLabelText='Email'
                onInput={this.handleChange} />
            </div>
          </Tab>
          <Tab label='Professor' type='teacher' onActive={this.handleActive} >
            <div className='row'>
              <TextField
                hintText='Email'
                data-key='email'
                fullWidth={true}
                errorText={valid.email ? undefined : 'Digite um email válido'}
                floatingLabelText='Email'
                onInput={this.handleChange} />
            </div>
            <div className='row'>
              <TextField
                hintText='Mensagem'
                data-key='text'
                fullWidth={true}
                floatingLabelText='Mensagem'
                multiLine={true}
                rows={4}
                onInput={this.handleChange} />
            </div>
          </Tab>
        </Tabs>
      </Dialog>
    );
  },
});

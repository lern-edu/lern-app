import React from 'react';

React.createClass({

  /* Lifecycle
  */

  getInitialState() {
    return { username: '', password: '', error: undefined };
  },

  /* Methods
  */

  errorAction({ message, clear }) {
    const state = { error: message };
    if (clear) _.assign(state, { username: '', password: '' });
    this.setState(state);

    const $node = $(ReactDOM.findDOMNode(this.refs.shakeable));
    $node.transition('shake');
  },

  /* Handlers
  */

  handleInput(str, { name }) {
    this.setState({ [name]: str });
    this.setState({ error: undefined });
  },

  handleSubmit(event) {
    event.preventDefault();
    const { username, password } = this.state;
    if (username && password) Meteor.loginWithPassword(username, password, err => {
      if (err) this.errorAction({ message: err.reason, clear: true });
      else FlowRouter.go('PublicHome');
    }); else this.errorAction({ message: 'Campos devem ser preenchidos' });
  },

  /* Render
  */

  render() {
    const { username, password, error } = this.state;

    return (
      <div className='ui container grid'>

        <div className='centered center aligned six wide column'>

          <form className='ui form' onSubmit={this.handleSubmit}>
            <div className='field'>
              <div className='ui left icon fluid input'>
                <i className='at icon' />
                <Semantic.Input type='text' placeholder='Usuário ou Email' onInput={this.handleInput} value={username} name='username' />
              </div>
            </div>

            <div className='field'>
              <div className='ui left icon fluid input'>
                <i className='lock icon' />
                <Semantic.Input type='password' placeholder='Senha' onInput={this.handleInput} value={password} name='password' />
              </div>
            </div>

            <Semantic.Button tag='button' classes='blue' type='submit' ref='shakeable'>
              Entrar
              <i className='right arrow icon' />
            </Semantic.Button>

            {error ? <div className='ui left pointing basic red label'>{error}</div> : undefined}
          </form>

        </div>

      </div>
    );
  },
});

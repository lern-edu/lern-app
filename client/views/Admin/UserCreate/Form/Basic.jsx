import React from 'react';

AdminUserCreateFormBasic = React.createClass({
  mixins: [Semantic.Transition({ appear: 'fly left', enter: 'fly left', leave: 'fly right' })],

  /* Render
  */

  render() {
    const { form } = this.props;

    const done = !_.some(['email', 'name', 'role'], k => form.state.errors[k]);

    return (
      <div className='ui centered grid' ref='animate'>

        <div className='row'>
          <div className='ui left icon input'>
            <i className='mail icon' />
            <Semantic.Input placeholder='Email' onInput={form.defaultHandler('email', { doc: true })} />
          </div>
        </div>

        <div className='row'>
          <div className='ui left icon input'>
            <i className='user icon' />
            <Semantic.Input placeholder='Name' onInput={form.defaultHandler('name', { doc: true })} />
          </div>
        </div>

        <div className='row'>
          <Semantic.Dropdown classes='selection' onChange={form.defaultHandler('role', { doc: true })}>
            <input type='hidden' name='role' />
            <i className='dropdown icon' />
            <div className='default text'>Tipo</div>
            <div className='menu'>
              {_.map(UserRoles.all('both'), (v, k) =>
                <div className='item' data-value={k} key={k}>{v}</div>
              )}
            </div>
          </Semantic.Dropdown>
        </div>

        <div className='row'>
          <Semantic.Button classes={done ? 'blue' : 'disabled'} onClick={form.nextStep}>
            Próximo
          </Semantic.Button>
        </div>

      </div>
    );
  },
});

import React from 'react';

AdminUserCreateFormRest = React.createClass({

  // Handlers

  handleSubmit() {
    const { form, form: { doc } } = this.props;
    if (_.includes(['teacher', 'student'], doc.get('role')))
      doc.set('schools', [doc.get('school')]);
    form.defaultSubmit();
  },

  /* Render
  */

  render() {
    const { ready, form, schools } = this.props;

    const done = form.state.valid;
    const role = form.doc.get('role');

    return (
      <div className='ui centered grid'>

        {role === 'school' ? (
          [
            <div className='row' key='schoolType'>
              <Semantic.Dropdown classes='selection' onChange={form.defaultHandler('schoolType', { doc: true })}>
                <input type='hidden' name='schoolType' />
                <i className='dropdown icon' />
                <div className='default text'>Tipo</div>
                <div className='menu'>
                  {_.map(SchoolTypes.all('both'), (v, k) =>
                    <div className='item' data-value={k} key={k}>{v}</div>
                  )}
                </div>
              </Semantic.Dropdown>
            </div>,
            <div className='row' key='cnpj'>
              <div className='ui left icon input'>
                <i className='barcode icon' />
                <Semantic.Input placeholder='CNPJ (só números)' onInput={form.defaultHandler('cnpj', { doc: true })} />
              </div>
            </div>,
          ]
        ) : role === 'student' || role === 'teacher' ? (
          [
            <div className='row' key='school'>
              {!ready.schools ? <div className='ui active inline loader' /> :
                <Semantic.Dropdown classes='selection' onChange={form.defaultHandler('school', { doc: true })}>
                  <input type='hidden' name='school' />
                  <i className='dropdown icon' />
                  <div className='default text'>Escola</div>
                  <div className='menu'>
                    {_.map(schools, school =>
                      <div className='item' data-value={school._id} key={school._id}>
                        <div className='description'>{SchoolTypes.getName(school.profile.schoolType)}</div>
                        <div className='text'>{school.getName()}</div>
                      </div>
                    )}
                  </div>
                </Semantic.Dropdown>
              }
            </div>,
            <div className='row' key='cpf'>
              <div className='ui left icon input'>
                <i className='barcode icon' />
                <Semantic.Input placeholder='CPF (só números)' onInput={form.defaultHandler('cpf', { doc: true })} />
              </div>
            </div>,
          ]
        ) : undefined}

        <div className='row'>
          <Semantic.Button classes={done || role === 'school' ? 'blue' : 'disabled'} onClick={this.handleSubmit}>
            Criar
          </Semantic.Button>
        </div>

      </div>
    );
  },
});

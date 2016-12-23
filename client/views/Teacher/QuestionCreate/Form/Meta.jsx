import React from 'react';

TeacherQuestionCreateFormMeta = React.createClass({

  // Static data

  instructions: {
    type: 'Defina o tipo da questão',
    subject: 'Escolha a matéria',
    tags: 'Escolha pelo menos um tema',
  },

  /* Handlers
  */

  handleTagsChange(_tags) {
    const { form } = this.props;
    const tags = _tags ? _tags.split(',') : [];
    form.defaultHandler({ tags }, { query: true });
  },

  /* Render
  */

  render() {
    const { ready, subjects, tags, form, errors } = this.props;
    const { subject, tags: rtags, type } = this.props.restore;
    const { instructions } = this;

    return (
      <div className='ui centered grid'>

        <div className='row'>
          <div className='six wide field'>
            <label>Tipo de Questão</label>
            <Semantic.Dropdown classes='selection' initial={type} onChange={form.defaultHandler('type', { query: true })}>
              <input type='hidden' name='subject' />
              <i className='dropdown icon' />
              <div className='default text'>Selecione um tipo</div>
              <div className='menu'>
                {_.map(QuestionTypes.all('both'), (v, k) =>
                  <div className='item' data-value={k} key={k}>
                    {v}
                  </div>
                )}
              </div>
            </Semantic.Dropdown>
            <div className='ui pointing basic blue label'>{instructions.type}</div>
          </div>
        </div>

        <div className='row'>
          {!ready.subjects ? (
            <div className='ui inline active loader' />
          ) : (
            <div className='six wide field'>
              <label>Matéria</label>
              <Semantic.Dropdown classes='selection' initial={subject} onChange={form.defaultHandler('subject', { query: true })}>
                <input type='hidden' name='subject' />
                <i className='dropdown icon' />
                <div className='default text'>Selecione uma matéria</div>
                <div className='menu'>
                  {_.map(subjects, s =>
                    <div className='item' data-value={s._id} key={s._id}>
                      {s.name}
                    </div>
                  )}
                </div>
              </Semantic.Dropdown>
              <div className='ui pointing basic blue label'>{instructions.subject}</div>
            </div>
          )}
        </div>

        <div className='row'>
          {!ready.tags ? (
            <div className='ui inline active loader' />
          ) : (
            <div className='six wide field'>
              <label>Temas</label>
              <Semantic.Dropdown classes={`multiple selection ${subject ? '' : 'disabled'}`} initial={rtags} onChange={this.handleTagsChange}>
                <input type='hidden' name='subject' />
                <i className='dropdown icon' />
                <div className='default text'>Selecione temas</div>
                <div className='menu'>
                  {_.map(_.filter(tags, { subject }), t =>
                    <div className='item' data-value={t._id} key={t._id}>
                      {t.text}
                    </div>
                  )}
                </div>
              </Semantic.Dropdown>
              <div className='ui pointing basic blue label'>{instructions.tags}</div>
            </div>
          )}
        </div>

        <div className='row'>
          <div className={`ui button ${errors.subject || errors.tags || errors.type ? 'disabled' : 'primary'}`} onClick={form.handleNextClick}>
            Seguinte
          </div>
        </div>

      </div>
    );
  },
});

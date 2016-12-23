import React from 'react';

TeacherQuestionCreateFormText = React.createClass({

  // Static data

  instructions: {
    text: 'Mínimo de 4 caracteres',
  },

  /* Render
  */

  render() {
    const { instructions } = this;
    const { form, errors } = this.props;

    return (
      <div className='ui centered grid'>

        <div className='row'>

          <div className='six wide field'>
            <label>Enunciado</label>
            <Semantic.Input tag='textarea' rows='4' placeholder='Digite o enunciado' onInput={form.defaultHandler('text', { doc: true })} />
            <div className='ui pointing blue basic label'>{instructions.text}</div>
          </div>

        </div>

        <div className='row'>

          <div className='eight wide field'>
            <TeacherQuestionCreateFormCard form={this.props.form} type='image/jpeg' key='image'/>
          </div>
          <div className='eight wide field'>
            <TeacherQuestionCreateFormCard form={this.props.form} type='audio/mpeg' key='audio'/>
          </div>

        </div>

        <div className='row'>
          <div className={`ui button ${errors.text ? 'disabled' : 'primary'}`} onClick={form.handleNextClick}>
            Seguinte
          </div>
        </div>

      </div>
    );
  },
});

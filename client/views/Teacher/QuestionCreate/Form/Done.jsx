import React from 'react';

TeacherQuestionCreateFormDone = React.createClass({
  /* Handlers
  */

  componentDidMount() {
    const { user, form } = this.props;
    form.defaultHandler({ school: user.get('profile.school') }, { doc: true });
  },

  /* Render
  */

  render() {
    const { valid, errors, form } = this.props;

    const fields = {
      type: 'Tipo',
      subject: 'Matéria',
      tags: 'Tags',
      text: 'Enunciado',
      answer: 'Resposta',
    };

    return (
      <div className='ui centered grid'>

        <div className='row'>
          <table className='ui very basic collapsing table'>
            <tbody>

              {_.map(fields, (v, k) =>
                <tr key={k} className={errors[k] ? 'negative' : ''}>
                  <td>
                    <i className={`icon ${errors[k] ? 'remove' : 'checkmark'}`} />
                    {v}
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>

        <div className='row'>
          <div className={`ui button ${valid ? 'primary' : 'disabled'}`} onClick={form.defaultSubmit}>
            <i className='submit icon' />
            Salvar
          </div>
        </div>

      </div>
    );
  },
});

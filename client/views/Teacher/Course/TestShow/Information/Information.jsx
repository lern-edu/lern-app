import React from 'react';
import { Paper } from 'material-ui';

TeacherTestShowInfo = React.createClass({

  // Render

  render() {
    const { props: { subjects, tags,
      test: { scores, timeoutType, timeout, name, info, startDate, endDate }, },
      } = this;
    return (
      <Paper style={{ marginTop: '0.5em' }}>
        <div style={{ padding: '1em' }}>

          <div className='row'>
            <p><b>Nome:</b> {name}</p>
            <p><b>Informações:</b> {info}</p>
            <p><b>Início:</b> {moment(startDate).format('DD/MM/YYYY HH:mm')}</p>
            <p><b>Término:</b> {moment(endDate).format('DD/MM/YYYY HH:mm')}</p>
            <p><b>Matérias:</b> {_.map(subjects, 'name').join(', ')}</p>
            {_.isEmpty(tags) ? undefined :
              <p><b>Tags:</b> {_.map(tags, 'text').join(', ')}</p>}
            <p><b>Tipo de cronômetro:</b> {TestTimeoutTypes.getName(timeoutType)}</p>
            {_.isEmpty(timeout) ? undefined :
              <p><b>Cronômetro:</b> {timeout / 60} minutos</p>}
            <p>{_.isEmpty(scores) ? 'Teste não avaliativo' :
            `Valor: ${_.sum(scores)} pontos`}</p>
          </div>

        </div>
      </Paper>
    );
  },
});

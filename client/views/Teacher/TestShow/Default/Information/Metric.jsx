import React from 'react';
import { Paper, SelectField, MenuItem } from 'material-ui';

TeacherTestShowDefaultMetrics = React.createClass({

  // Initial state

  getInitialState() {
    return { org: 'grade' };
  },

  // Lifecycle

  componentWillMount() {
    this.updateAttemptsOptions();
  },

  componentWillReceiveProps() {
    this.updateAttemptsOptions();
  },

  // update static data

  updateAttemptsOptions() {
    const { options, props: { attempts } } = this;
    const studentAttempts = _.reverse(_.sortBy(_.groupBy(attempts, 'author'), 'length'));
    _.forEach(_.get(studentAttempts, '[0]'), (value, index) =>
      options.attempts[index] = {
        label: `Tentativa ${index + 1}`,
        info: `Selecionadas tentativas de número ${index + 1} dos estudantes`,
      }
    );
  },

  // Static data

  options: {
    attempts: {
      grade: {
        label: 'No diário',
        info: 'Selecionandas as tentativas que estão presente no diário de notas',
      },
    },

    infos: {
      grade: {
        label: 'Notas',
        info: 'Informações das notas dos alunos',
      },
      questions: {
        label: 'Questões',
        info: 'Informações do aproveitamento por questões',
      },

      // subjects: {
      //   label: 'Matérias',
      //   info: 'Informações das notas dos alunos segmentado por matérias',
      // },
      // tags: {
      //   label: 'Tags',
      //   info: 'Informações das notas dos alunos segmentado por tags',
      // },
      // time: {
      //   label: 'Tempo',
      //   info: 'Informações do tempo de execução das tentativas',
      // },
    },

  },

  // Render

  render() {
    const { options, options: { attempts, infos },
      props: { attemptsFilter, infosFilter, chart }, } = this;

    return (
      <div style={{ marginTop: '1.5em' }}>
        <TeacherTestShowDefaultMetricsToolbar {...this.props} options={options}/>

        <Paper>
          <div style={{ padding: '1em' }}>

            <div className='row'>
              <p><b>Tipo:</b> {JSON.parse(chart) ? 'Gráfico' : 'Tabela'}</p>
              <p><b>Filtro de Informações:</b> {_.get(infos, `${infosFilter}.info`)}</p>
              <p><b>Filtro de Tentativas:</b> {_.get(attempts, `${attemptsFilter}.info`)}</p>
            </div>

            <div className='row'>
              {JSON.parse(chart)
                ? <TeacherTestShowDefaultInfoChart {...this.props} />
                : <TeacherTestShowDefaultInfoTable {...this.props} options={options} />}
            </div>

          </div>
        </Paper>

      </div>
    );
  },
});

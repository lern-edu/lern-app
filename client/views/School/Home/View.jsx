// Libs
import React from 'react';
import LinearProgress from 'material-ui';
import { blue700 } from 'material-ui/styles/colors';

// Views
import SchoolHomeToolbar from './Toolbar.jsx';
import SchoolHomeTutorial from './Tutorial.jsx';
import SchoolHomeOverview from './Overview.jsx';

const SchoolHomeView = React.createClass({

  text: {
    welcome: 'Bem vindo à lern!',
    tutorial: 'Faça o tutorial para começar',
    steps: {
      one: {
        img: '/images/steps-teacher/1.png',
        text: 'Clique no canto da tela para iniciar',
      },
      two: {
        img: '/images/steps-teacher/2.png',
        text: 'Em "Minhas questões" é possível criar e gerenciar suas próprias questões',
      },
      tree: {
        img: '/images/steps-teacher/3.png',
        text: 'Clique em "+ adicionar questão" e siga os passos cara incluir uma questão',
      },
      four: {
        img: '/images/steps-teacher/4.png',
        text: 'Em "Disciplinas", escolha a matéria e a turma desejada e clique em entrar',
      },
      five: {
        img: '/images/steps-teacher/5.png',
        text: 'É possível planejar cada aula. Clique em "Nova aula" para começar.',
      },
      six: {
        img: '/images/steps-teacher/6.png',
        text: 'Preencha as informações e clique em salvar.',
      },
      seven: {
        img: '/images/steps-teacher/7.png',
        text: 'Selecione a aula desejada para adicionar conteúdo, realizar chamada e gerar dever de casa',
      },
      eight: {
        img: '/images/steps-teacher/8.png',
        text: 'Em "Atividades", crie e gerencie exercícios',
      },
      nine: {
        img: '/images/steps-teacher/9.png',
        text: 'Clique em "Nova atividade" para criar um novo exercício. Siga os passos na tela para concluir',
      },
      ten: {
        img: '/images/steps-teacher/10.png',
        text: 'Lance suas notas de avaliação em "Notas".',
      },
      eleven: {
        img: '/images/steps-teacher/11.png',
        text: 'Monitore a presença e atividades realizadas através do diário',
      },
      twelve: {
        img: '/images/steps-teacher/12.png',
        text: 'Acompanhe a nota dos alunos em "Relatório"',
      },
      thirteen: {
        img: '/images/steps-teacher/13.png',
        text: 'Utilize o blog para se comunicar com os alunos através da plataforma. Clique em "Novo post" para adicionar uma postagem',
      },
      fourteen: {
        img: '/images/steps-teacher/14.png',
        text: 'A comunidade acadêmica, diferente do blog, é aberta para toda a comunidade lern. Nela são postadas dúvidas, resoluções e informações',
      },
      fifteen: {
        img: '/images/steps-teacher/15.png',
        text: 'Para publicar na comunidade acadêmica, clique no "+" e siga os passos na tela',
      },
    },
  },
  /* Render
  */

  render() {

    return (
      <div style={{ backgroundColor: blue700, height: 'calc(100vh - 64px)' }}>
        <Layout.Bar title='Início' />
        <div>
        {/*{!_.every(ready) ? <LinearProgress /> : _.get({
          true: <SchoolHomeTutorial {...this.text} key='tutorial'/>,
          false: <SchoolHomeOverview {...this.data} key='overview'/>,
        }, tutorial)}*/}
          <SchoolHomeOverview />
        </div>
      </div>
    );
  },
});
export default SchoolHomeView;

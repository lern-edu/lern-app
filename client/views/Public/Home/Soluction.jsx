import React from 'react';
import { CardText, Card, CardMedia, CardTitle } from 'material-ui';

const PublicHomeSoluction = React.createClass({

  // Styles

  styles: {
    title1: {
      textAlign: 'center',
      marginBottom: '30px',
      top: '20px',
      position: 'relative',
    },
    soluction: {
      backgroundColor: '#fff',
      backgroundImage: 'linear-gradient(#eee .1em, transparent .1em)',
      backgroundSize: '100% 1.2em',
    },
  },

  text: {
    prof: {
      title: 'Professores @ Lern',
      image: '/images/home/teacher.jpg',
      text: 'Crie, aplique e revise exercícios por meio de uma interface simple e interativa!',
    },
    student: {
      title: 'Estudante @ Lern',
      image: '/images/home/student.jpg',
      text: 'Conhecendo por completo suas competências, você é mais que seu boletim!',
    },
    pedagogy: {
      title: 'Pedagogo @ Lern',
      image: '/images/home/report.jpg',
      text: 'Que tal diagnosticar as informações comportametais dos alunos e professores?',
    },
    school: {
      title: 'Escola @ Lern',
      image: '/images/home/school.jpg',
      text: 'Otimização dos processos e recursos informacionais para um upgrade pedagógico.',
    },
  },

  render() {
    const { soluction, title1 } = this.styles;
    return (
      <div style={soluction}>
        <h1 style={title1} >Mais soluções @ Lern</h1>
        <br />
        <div className='ui grid fluid' style={{ padding: 20 }}>
          {
            _.map(this.text, ({ title, image, text }, key) =>
            <div
              className='sixteen wide mobile eight wide tablet four wide computer column'
              key={key}>
              <Card className='ui basic segment'>
                <CardTitle title={title}  />
                {image ? <CardMedia><img src={image} /></CardMedia> : undefined}
                <CardText>{text}</CardText>
              </Card>
            </div>
          )
        }
        </div>
      </div>
    );
  },
});

export default PublicHomeSoluction;

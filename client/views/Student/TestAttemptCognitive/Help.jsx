import React from 'react';
import { TextField, Dialog, FlatButton, Card, CardMedia, CardText, CardTitle } from 'material-ui';

StudentTestAttemptCognitiveHelp = React.createClass({

  // Render

  render() {
    const { open } = this.props;

    return (
      <Dialog
        title={`Ajuda`}
        open={open}
        modal={false}
        contentStyle={{ width: '100%' }}
        style={{ heigth: '100%' }}
        bodyStyle={{ overflow: 'auto' }}
        onRequestClose={this.props.handleClose}
        actions={[
          <FlatButton
            label='Fechar'
            primary={true}
            onTouchTap={this.props.handleClose} />,
         ]} >
        <Card style={{ width: '100%' }}>
          <div >
            <CardTitle title='Instruções' />
            <CardText>
              <p><strong>Responda todas as perguntas para prosseguir!</strong></p>
              <p>Este questionário tem como objetivo de identificar qual é o seu potencial para tornar-se
              empreendedor. Para tanto o resultado obtido por você, respondendo as questões que se seguem, será
              comparado com os resultados alcançados por empreendedores que já suplantaram a barreira dos cinco
              anos com suas empresas funcionando. O questionário foi montado utilizando um diálogo entre dois
              amigos e uma série de frases. Por favor, não deixe nenhuma frase sem resposta. Não existem situações
              certas ou erradas. A sua resposta deve refletir o seu comportamento, ou seja, a forma como você entende
              as coisas, age ou agiria em determinadas circunstâncias. Em caso de dúvida, opte pela opção que mais se
              aproxima de sua maneira de ser.</p>
              <p>Cada frase oferece um leque de possibilidades que vão de 0 (zero) a 10 (dez). O 0 (zero)
              significa que você discorda totalmente do enunciado da frase e o 10 (dez) que você concorda totalmente.
              Entre esses números, qualquer valor intermediário poderá ser o da sua escolha e representar como você
              pensa, age ou agiria. Para ajudá-lo, em sua decisão, mostra-se a seguir a escala em forma de régua.</p>
            </CardText>
            <CardMedia><img src='/images/entrepeneur/metric.jpg' /></CardMedia>
            <CardText>
              <p>Dá-se a seguir um exemplo prático para melhor entendimento. Na afirmação “Gosto de realizar
              coisas novas”, se você discordar, porém com pouca intensidade, a escolha poderá ser 4 ou 4,5, o que
              representará só 40% ou 45 % de chances de haver interesse de sua parte em realizar coisas novas.</p>
            </CardText>
          </div>
        </Card>
      </Dialog>
    );
  },

});

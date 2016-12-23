import React from 'react';
import { RaisedButton, Card, CardMedia, Divider, Slider, CardText, TextField } from 'material-ui';

StudentTestAttemptQuestionHeader = React.createClass({

  render() {
    const { test, questionsGroup, answersGroup, attempt, subjects, index } = this.props;
    const enumText = _.get([
      '<p> <b>Vamos ao diálogo entre os dois amigos.</b><br/> <i>Antônio tem um sonho: tornar-se dono do seu próprio nariz, ou seja, em vez de trabalhar para outra pessoa, trabalhar para ele mesmo. Sempre que Antônio conversa com seus amigos ele diz:<br/> — Um dia, se Deus quiser, vou trabalhar para mim mesmo e não vou mais aturar ordens de ninguém!<br/> Joaquim, o melhor amigo de Antônio e há algum tempo dono do seu próprio negócio, pergunta sempre:<br/> — Antônio, o que você já fez para alcançar esse objetivo? Já marcou uma data para deixar o emprego, já definiu o tipo de coisa que vai fazer?<br/> — Não, mas um dia eu chegarei lá! — diz Antônio, demonstrando segurança.</i><br/> <b>Agora, pense em você. </b>Existe alguma semelhança ou você difere de Antônio? Atribua um valor, as frases a seguir, colocando a sua opinião, em forma de concordância ou discordância, de acordo com a escala apresentada anteriormente. Lembre-se, quanto mais você se aproxima de 0 (zero) mais discorda do enunciado da frase. Por outro lado, quanto mais você se aproxima de 10 (dez) mais concorda com o enunciado da frase. Coloque o valor (escore) que você definiu, como sendo representativo do seu comportamento, no espaço que escrito valor. </p>',
      '<p> <b>Continuando.</b><br/> <i>Certo dia Joaquim se encontra com Antônio e dispara:<br/> — E aí, continua com aquela idéia de abrir um negócio?<br/> — Claro você me conhece! — responde Antônio. — Eu sou persistente, duro na queda. Quando caio me levanto e vou em frente. Mas, nesse caso é preciso ir devagar, com cautela. Não adianta correr, por o carro na frente dos bois.<br/> — Sei disso muito bem! — retruca Joaquim.<br/> — Eu gosto das coisas bem feitas. Por isso ainda não comecei. Mas isso não importa, eu não sou apressado. Para mim só interessa a definição de que vou abrir um negócio. O momento certo será quando eu encontrar uma oportunidade que me leve a acreditar que terei sucesso. No momento estou alerta, buscando oportunidades. Quando surgir aquela que eu considere a certa, acredito eu, então será hora de começar — diz Antônio.</i><br/> <b>Pense em você. </b>Será que seus pensamentos, aspirações, ações, são semelhantes aos de Antônio, ou diferem? Posicione-se, valorando em termos de concordância/discordância, ao pontuar as frases a seguir. </p>',
      '<p> <b>Continuação do diálogo.</b><br/> <i>Joaquim se interessa pelo assunto e continua:<br/> — Essas coisas são muito próprias de você. Eu te conheço. Você é aquele tipo de pessoa que, para fazer as coisas, primeiro tem que se informar bem, aprender, planejar como fazer, definir aonde pretende chegar, quanto vai ganhar.<br/> — Isso mesmo! — diz Antônio. — Eu gosto de fazer as coisas, como se diz, bem arrumadinhas. Você também é assim!<br/> — É verdade! – retruca Joaquim. — Eu, assim como você, gosto de fazer as coisas planejadas, controladas. Acredito, embora não saiba se estou certo ou errado, que as coisas têm que ser assim. Você pensa igual a Antônio e Joaquim, ou é diferente deles? </i><br/>Nas frases a seguir atribua um valor ao seu grau de concordância/discordância com o enunciado. Lembre-se, quanto mais próximo de 0 (zero) maior a discordância e quanto mais próximo de 10 (dez) maior a concordância.</i><br/> </p>',
      '<p> <b>Finalização do diálogo.</b><br/> <i>— Uma coisa que eu ainda não tenho, e você já conseguiu montar — diz Antônio — é uma boa rede de relacionamentos.<br/> — Quanto a isso não se preocupe! — retruca Joaquim — Você tem qualidades! Em minha opinião sua capacidade de convencer as pessoas é boa, você se entrosa fácil, e quanto à rede de relacionamentos eu discordo de sua auto-avaliação. Chego até a pensar que ela é melhor do que a minha – finaliza Joaquim.<br/> — Bondade sua! — diz Antônio, enquanto tenta disfarçar um sorriso de satisfação.<br/> — Vá em frente, Antônio! Eu acredito em você! — encerrando a conversa e despedindo-se.</i><br/> Antônio e Joaquim têm essas características. Em que grau você acha que as possui? <br/>Leia as frases a seguir e coloque, dentro dos colchetes, o valor, na escala de 0 a 10, que representa o seu grau de concordância/discordância com o enunciado da frase. </p>'],
    index - 1);

    // let enumImage = _.head(_.compact(_.flatten(_.map(questionsGroup, 'images[0]')))) || null;

    return (
      <div className='ui vertical segment'>
        <div className='ui grid'>

          <Card className='centered center aligned ten wide computer fourteen wide mobile column'>
            <CardText>
              <div className='row'>
                <div className='centered center aligned ten wide computer fourteen wide mobile column'>
                  <div style={{ textAlign: 'justify', textJustify: 'inter-word', WebkitUserSelect: 'none', WebkitTouchCallout: 'none', MozUserSelect: 'none', msUserSelect: 'none', fontSize: '18px'}}
                    dangerouslySetInnerHTML={{ __html: enumText }} />
                </div>
              </div>
            </CardText>
          </Card>

          {/* {enumImage ? (
            <Card className='centered center aligned ten wide computer fourteen wide mobile column'>
                <CardMedia>
                <img className='ui centered fluid image' src={enumImage.url()}
                  style={{ padding: '2em', maxWidth: '900px' }}/>
                </CardMedia>
            </Card>
          ) : undefined} */}

          {_.map(questionsGroup, ({ text, _id }, i) =>
            <Card key={_id} className='centered center aligned ten wide computer fourteen wide mobile column'>
              <CardText>
                <div className='row'>
                  <div className='centered center aligned ten wide computer fourteen wide mobile column'>
                    <div style={{ textAlign: 'justify', textJustify: 'inter-word', WebkitUserSelect: 'none', WebkitTouchCallout: 'none', MozUserSelect: 'none', msUserSelect: 'none', fontSize: '18px'}}
                      dangerouslySetInnerHTML={{ __html: text }} />
                  </div>
                </div>
                <div className='row'>
                  <TextField
                    hintText='Valor'
                    disabled={_.get(_.find(answersGroup, { question: _id }), 'finished')}
                    onChange={({ target: { value } }) => {
                        Meteor.call('StudentAnswerUpdate',
                        _.find(answersGroup, { question: _id })._id, _.trim(value),
                        err => err ? snak('Não foi possível responder') : undefined);
                      }
                    }
                    value={_.get(_.find(answersGroup, { question: _id }), 'answer') || ''} />
                </div>
              </CardText>
            </Card>)}

        </div>
      </div>
    );
  },
});

import React from 'react';
import { Card, CardTitle, CardText, CardMedia } from 'material-ui';
import { RadioButtonGroup, RadioButton, Divider } from 'material-ui';
import { green700, redA700 } from 'material-ui/styles/colors';

const StudentAttemptDefaultAnswers = React.createClass({

  // Function

  getAnswerLetter(answer) {
    if (answer.type !== 'closed') return '';
    else if (_.isNull(answer.answer)) return '';
    else return `(${String.fromCharCode(answer.answer + 65)})`;
  },

  // Render

  render() {
    const { test, questions, answers, images } = this.props;
    const list = _.map(test.questions, q => ({
      question: _.find(questions, { _id: q }),
      answer: _.find(answers, { question: q }),
    }));

    return (
      <div>
        {
          _.map(list, ({ answer, question }, i) =>
            <Card key={question._id} style={{ marginTop: 5 }} >
              <CardTitle
                title={`Questão ${i + 1}`}
                actAsExpander={true}
                subtitle={
                  !answer
                  ? 'sem resposta'
                  : !_.isFinite(answer.grade)
                  ?  (
                    question.type === 'number'
                    ? <span> {`Resposta: ${answer.answer}`} </span>
                    : 'sem nota'
                  )
                  : answer.grade === 0
                  ? <span style={{ color: redA700 }}>
                      {`Resposta: ${this.getAnswerLetter(answer)} - Errada`}
                    </span>
                  : answer.grade === 1
                  ? <span style={{ color: green700 }}>
                      {`Resposta: ${this.getAnswerLetter(answer)} - Correta`}
                    </span>
                  : numeral(answer.grade).format('0%')
                }
              />
              <CardText expandable={true} >
                <h4 className='ui header'>Enunciado</h4>
                <div className='ui grid' >

                  {
                    _.map(question.get('content'), (s, i) =>
                      <div className='sixteen wide column' key={i} >
                        <PublicContentShow
                          canRemove={false}
                          schema={Questions.ContentSchema}
                          index={i}
                          doc={s} />
                      </div>
                    )
                  }

                </div>
                {
                  _.get({
                    open: [
                      <h4 className='ui header' key='header'>Resposta de referência</h4>,
                      <p key='answer'>{question.answer}</p>,
                    ],
                    number: [
                      <h4 className='ui header' key='header'>Intervalo de resposta</h4>,
                      <p key='answer'>
                        De {question.range.min} até {question.range.max}
                      </p>,
                    ],
                    closed: [
                      <h4 className='ui header' key='header'>Opções</h4>,
                      <RadioButtonGroup
                        key='options'
                        name='options'
                        valueSelected={_.toString(question.answer)}
                        defaultSelected='not_light'
                      >
                        {
                          _.map(question.options, (options, index) =>
                            <RadioButton
                              key={index}
                              style={{ marginTop: '20px', marginBotton: '20px' }}
                              disabled={true}
                              value={_.toString(index)}
                              label={
                                <PublicContentShow
                                  canRemove={false}
                                  schema={Questions.OptionSchema}
                                  index={i}
                                  doc={option} />
                              }
                            />
                          )
                        }
                      </RadioButtonGroup>,
                    ],
                  }, question.type)
                }
              </CardText>
            </Card>
          )
        }
      </div>
    );
  },
});

export default StudentAttemptDefaultAnswers;


//     <Divider />
//     {item.question.type === 'open' ?
//       <CardText expandable={true} style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
//         <div style={{ textAlign: 'justify', textJustify: 'inter-word', WebkitUserSelect: 'none', WebkitTouchCallout: 'none', MozUserSelect: 'none', msUserSelect: 'none', fontSize: '18px'}}
//           dangerouslySetInnerHTML={{ __html: item.question.answer }} />
//       </CardText>
//     : item.question.type === 'closed' ?
//     <CardText expandable={true} >
//
//     </CardText>
//     : undefined}
// </Card>
//

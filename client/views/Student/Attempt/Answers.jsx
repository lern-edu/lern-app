import React from 'react';
import { Card, CardTitle, CardText, CardMedia, RadioButtonGroup, RadioButton, Divider } from 'material-ui';
import { green700, redA700 } from 'material-ui/styles/colors';

StudentAttemptAnswers = React.createClass({
  getAnswerLetter(answer) {
    if (answer.type !== 'closed') return '';
    else if (_.isNull(answer.answer)) return '';
    else return `(${String.fromCharCode(answer.answer + 65)})`;
  },

  getImageUrl(id) {
    const { images } = this.props;
    const image = _.find(images, { _id: id });
    try {
      return image ? image.url() : '/images/not-found.png';
    } catch (e) {
      return '/images/not-found.png';
    };
  },

  render() {
    const { test, questions, answers, images } = this.props;
    const list = _.map(test.questions, q => ({
      question: _.find(questions, { _id: q }),
      answer: _.find(answers, { question: q }),
    }));

    return (
      <div>
        {_.map(list, (item, i) => (
          <Card key={item.question._id} style={{ marginTop: 5 }}>
            <CardTitle
              title={`Questão ${i + 1}`}
              actAsExpander={true}
              subtitle={
                !item.answer
                ? 'sem resposta'
                : !_.isFinite(item.answer.grade)
                ? 'sem nota'
                : item.answer.grade === 0
                ? <span style={{ color: redA700 }}>{`Resposta Errada ${this.getAnswerLetter(item.answer)}`}</span>
                : item.answer.grade === 1
                ? <span style={{ color: green700 }}>{`Resposta Correta ${this.getAnswerLetter(item.answer)}`}</span>
                : numeral(item.answer.grade).format('0%')
              }
            />
            <CardText expandable={true} style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
              <div style={{ textAlign: 'justify', textJustify: 'inter-word', WebkitUserSelect: 'none', WebkitTouchCallout: 'none', MozUserSelect: 'none', msUserSelect: 'none', fontSize: '18px'}}
                dangerouslySetInnerHTML={{ __html: item.question.text }} />
            </CardText>
            {item.question.image ?
              <CardMedia expandable={true}>
                <img className='ui centeredA700 fluid image'
                  src={this.getImageUrl(item.question.image)}
                  style={{ padding: '2em', maxWidth: '900px' }}/>
              </CardMedia> : undefined}
              <Divider />
              {item.question.type === 'open' ?
                <CardText expandable={true} style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
                  <div style={{ textAlign: 'justify', textJustify: 'inter-word', WebkitUserSelect: 'none', WebkitTouchCallout: 'none', MozUserSelect: 'none', msUserSelect: 'none', fontSize: '18px'}}
                    dangerouslySetInnerHTML={{ __html: item.question.answer }} />
                </CardText>
              : item.question.type === 'closed' ?
              <CardText expandable={true} >
                <RadioButtonGroup
                  name='options'
                  valueSelected={_.toString(_.get(item.question, 'answer'))}
                  defaultSelected='not_light' >
                  {_.map(_.get(item.question, 'options'), ({ text, image }, index) =>
                    <RadioButton
                      key={index}
                      style={{ marginTop: '20px', marginBotton: '20px' }}
                      disabled={true}
                      value={_.toString(index)}
                      label={text ?
                        <div
                          style={{ textAlign: 'justify', textJustify: 'inter-word', paddingLeft: '10px' }}
                          dangerouslySetInnerHTML={{ __html:
                            `${String.fromCharCode(index + 97)}) ${text}`, }} />
                        : <img className='ui medium image' src={this.getImageUrl(image)} />}
                    />)}
                </RadioButtonGroup>
              </CardText>
              : undefined}
          </Card>
        ))}
      </div>
    );
  },
});

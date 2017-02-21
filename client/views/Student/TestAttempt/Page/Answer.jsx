import React from 'react';
import { RadioButton, RadioButtonGroup, Divider } from 'material-ui';

StudentTestAttemptPageAnswer = React.createClass({

  /* Handlers
  */

  handleOptionClick(event, index) {
    const { answer } = this.props;
    Meteor.call('StudentAnswerUpdate', answer._id, _.parseInt(index), err =>
      err ? console.log(err) : undefined);
  },

  handleInput(str) {
    const { answer } = this.props;
    Meteor.call('StudentAnswerUpdate', answer._id, str, err =>
      err
      ? console.log(err)
      : undefined
    );
  },

  getImageUrl(id) {
    const { question: { images } } = this.props;
    const image = _.find(images, { _id: id });
    try {
      return image ? image.url() : '/images/not-found.png';
    } catch (e) {
      return '/images/not-found.png';
    };
  },

  /* Render
  */

  render() {
    const { question, answer } = this.props;

    return (
      <div className='ui vertical segment'>

        <div className='ui form grid'>

          <div className='centered center aligned eight wide computer thirteen wide mobile column'>

            {question.type === 'open' ?
              <div className={`field ${answer.finished ? 'disabled' : ''}`}>
                <Semantic.Input
                  tag='textarea'
                  defaultValue={answer.answer}
                  rows={5}
                  onInput={_.debounce(this.handleInput, 500)}
                  onChange={_.identity}
                />
              </div>
            : question.type === 'closed' ?
            <RadioButtonGroup
              name='options'
              valueSelected={_.toString(_.get(answer, 'answer'))}
              defaultSelected='not_light'
              onChange={this.handleOptionClick} >
              {_.map(_.get(question, 'options'), ({ text, image }, index) =>
                <RadioButton
                  key={index}
                  style={{ marginTop: '20px', marginBotton: '20px' }}
                  disabled={_.get(answer, 'finished') ? true : false}
                  value={_.toString(index)}
                  label={text ?
                    <div
                      style={{ textAlign: 'justify', textJustify: 'inter-word', paddingLeft: '10px' }}
                      dangerouslySetInnerHTML={{ __html:
                        `${String.fromCharCode(index + 97)}) ${text}`, }} />
                    : <img className='ui medium image' src={this.getImageUrl(image)} />}
                />)}
            </RadioButtonGroup>
            : undefined}

            </div>

        </div>

      </div>
    );
  },
});

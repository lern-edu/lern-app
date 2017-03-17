// Libs
import React from 'react';
import { green500 } from 'material-ui/styles/colors';
import { FontIcon, TextField } from 'material-ui';
import { RadioButtonGroup, RadioButton } from 'material-ui';
import { Editor, EditorState, convertFromRaw } from 'draft-js';

const StudentTestAttemptGlobalContentQuestion = React.createClass({

  // Initial state

  getInitialState() {
    const { answer } = this.props;
    return { answer: _.get(answer, 'answer') };
  },

  // Static

  answer: <FontIcon className='material-icons' color={green500} >done</FontIcon>,

  // Handlers

  handleOpenAnswer(event, answer) {
    this.setState({ answer });
    this.handleUpdateAnswer(answer);
  },

  handleNumberAnswer(event, value) {
    const { question: { range } } = this.props;
    const answer = parseInt(value);
    if (!value || _.inRange(answer, range.min, range.max) || value == range.max) {
      this.setState({ answer: !value ? null : answer });
      this.handleUpdateAnswer(!value ? null : _.toNumber(answer));
    } else return;
  },

  handleClosedAnswer(event, answer) {
    this.setState({ answer });
    this.handleUpdateAnswer(answer);
  },

  handleUpdateAnswer(value) {
    const { answer } = this.props;
    Meteor.call('StudentAnswerUpdate', answer._id, value, err => {
      if (err) {
        console.log(err);
        snack(':(');

        // FlowRouter.go('StudentHome');
      }
    });
  },

  // Render

  render() {
    const { question, questionIndex, answer: a } = this.props;
    const { answer } = this.state;
    return (
      <div>

        <div className='row' >
          <h4 className='ui header' >
            Questão {questionIndex}
          </h4>
        </div>

        <div className='row'>
          {_.map(question.content, (c, i) => [
            <PublicContentShow
              canRemove={false}
              schema={Questions.ContentSchema}
              index={i}
              doc={c} />,
            <br/>,
          ])}
        </div>

        <div className='row'>
          {_.get({
            open: <TextField
              value={_.toString(answer) || ''}
              floatingLabelText='Resposta'
              multiLine={true}
              rows={3}
              onChange={this.handleOpenAnswer}
            />,
            number: <TextField
              value={_.toString(answer) || ''}
              floatingLabelText={
                `Resposta de ${_.get(question, 'range.min')} até ${_.get(question, 'range.max')}`
              }
              onChange={this.handleNumberAnswer}
            />,
            closed:
              <RadioButtonGroup
                valueSelected={answer}
                onChange={this.handleClosedAnswer}
                name='options'
                defaultSelected='not_light'>
                {
                  _.map(
                    question.options, (c, i) =>
                    <RadioButton
                      value={i}
                      key={i}
                      label={
                        <PublicContentShow
                          canRemove={false}
                          field='options'
                          schema={Tests.PageContentSchema}
                          index={i}
                          doc={c}
                        />
                      }
                    />
                  )
                }
              </RadioButtonGroup>,
          }, question.type)}
        </div>

      </div>
    );
  },
});

export default StudentTestAttemptGlobalContentQuestion;

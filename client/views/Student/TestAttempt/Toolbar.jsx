import React from 'react';
import { Toolbar, ToolbarGroup, ToolbarTitle, IconButton, ToolbarSeparator, FontIcon, RaisedButton, } from 'material-ui';

StudentTestAttemptToolbar = React.createClass({

  // handlers

  handleForward() {
    const { index=0, test, answers, answer } = this.props;
    if (_.parseInt(index) < _.get(test, 'questions.length') - 1)
      FlowRouter.setParams({ index: _.parseInt(index) + 1 });

    // when you answer all questions ypu can finish
    if (_.isEqual(_.get(test, 'questions.length'), answers.length)
      && _.every(_.pullAllBy(answers, [{ _id: answer._id }], '_id'), 'finished'))
      this.finishAttempt();
  },

  handleBack() {
    const { index=0, test } = this.props;
    if (_.parseInt(index)) FlowRouter.setParams({ index: _.parseInt(index) - 1 });
  },

  handleAnswer() {
    const { answer, answers } = this.props;
    Meteor.call('StudentAnswerFinish', answer._id, err => {
      if (err) {
        console.log(err);
        if (!_.isEmpty(_.get(err, 'reason.answer')))
          snack('Marque alguma alternativa');
        else snack(':(');
      } else this.handleForward();
    });
  },

  // util

  finishAttempt() {
    const { test } = this.props;
    Meteor.call('StudentAttemptFinish', test._id, err => {
      if (err) {
        console.log(err);
        snack(':(');
      } else {
        snack('Enviado');
        FlowRouter.go('StudentTest', { testId: test._id });
      }
    });
  },

  /* Get Context
  */

  contextTypes: {
    screen: React.PropTypes.string,
  },

  // render

  render() {
    const { test, question, index=0, answer } = this.props;
    const { screen } = this.context;

    return (
      <Toolbar style={{ position: 'relative', zIndex: '1000' }}>
        <ToolbarGroup float='left'>
          <IconButton
            onTouchTap={this.handleBack}
            children={<FontIcon className='material-icons' >arrow_back</FontIcon>}
            disabled={!_.isEqual(_.get(test, 'timeoutType'), 'question') && _.parseInt(index)
              ? false : true}
            touch={true}
            tooltip='Voltar'
            tooltipPosition='bottom-right' />
        </ToolbarGroup>
        <ToolbarGroup float='left'>
          <IconButton
            onTouchTap={this.handleForward}
            children={<FontIcon className='material-icons' >arrow_forward</FontIcon>}
            touch={true}
            disabled={!_.isEqual(_.get(test, 'timeoutType'), 'question') &&
              _.parseInt(index) < _.get(test, 'questions.length') - 1 ? false : true}
            tooltip='Avançar'
            tooltipPosition='bottom-left' />
        </ToolbarGroup>
          {screen !== 'computer' ? (
          <ToolbarGroup float='right'>
            <RaisedButton
              primary={true}
              label='Responder'
              disabled={_.get(answer, 'finished') ? true : false}
              onClick={this.handleAnswer} />
          </ToolbarGroup>) : (
            <ToolbarGroup float='right'>
              <ToolbarTitle key='title'
                text={question && `Questão ${1 + _.indexOf(test.questions, question._id)}`} />
              <ToolbarSeparator key='separator' />
              <RaisedButton
                primary={true}
                label='Responder'
                disabled={_.get(answer, 'finished') ? true : false}
                onClick={this.handleAnswer} />
            </ToolbarGroup>
          )}
      </Toolbar>
    );
  },

});

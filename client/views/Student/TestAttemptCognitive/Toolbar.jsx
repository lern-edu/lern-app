import React from 'react';
import { Toolbar, ToolbarGroup, ToolbarTitle, IconButton, ToolbarSeparator, FontIcon, RaisedButton, } from 'material-ui';

StudentTestAttemptCognitiveToolbar = React.createClass({

  // initial state

  getInitialState() {
    return { open: false };
  },

  // handlers

  handleAnswer() {
    const { answersGroup, index, handleNext } = this.props;
    $('body').animate({ scrollTop: 0 }, '500');
    Meteor.call('StudentAnswersFinish', _.map(answersGroup, '_id'), err => {
      if (err) console.log(err);
      else if (_.parseInt(index) < 4) handleNext();
      else this.finishAttempt();
    });
  },

  handleOpen() {
    const { open } = this.state;
    this.setState({ open: !open });
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
    const { test, index=0, answersGroup } = this.props;
    const { screen } = this.context;
    const { open } = this.state;
    return (
      <Toolbar style={{ position: 'fixed', zIndex: '1000' }}>
        <ToolbarGroup float='left'>
          <IconButton
            onTouchTap={this.handleOpen}
            children={<FontIcon className='material-icons' >help</FontIcon>}
            touch={true}
            tooltip='Ajuda'
            tooltipPosition='bottom-left' />
        </ToolbarGroup>
          {screen !== 'computer' ? (
          <ToolbarGroup float='right'>
            <RaisedButton
              primary={true}
              label='Responder'
              disabled={!_.every(answersGroup, ({ answer }) => {
                if ((!answer && answer != 0) ||
                  answer < 0 || answer > 10 || _.isNaN(_.toNumber(answer))) return false;
                else return true;
              })}
              onClick={this.handleAnswer} />
          </ToolbarGroup>) : (
            <ToolbarGroup float='right'>
              <RaisedButton
                primary={true}
                label='Responder'
                disabled={!_.every(answersGroup, ({ answer }) => {
                  if ((!answer && answer != 0) ||
                    answer < 0 || answer > 10 || _.isNaN(_.toNumber(answer))) return false;
                  else return true;
                })}
                onClick={this.handleAnswer} />
            </ToolbarGroup>
          )}
          <StudentTestAttemptCognitiveHelp open={open} handleClose={this.handleOpen}/>
      </Toolbar>
    );
  },

});

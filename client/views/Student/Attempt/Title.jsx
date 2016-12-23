import React from 'react';
import { FlatButton, RaisedButton } from 'material-ui';

StudentAttemptTitle = React.createClass({

  handleTestStart() {
    const { test, attempts } = this.props;
    const route = _.get(test, 'type') === 'cognitive'
      ? 'StudentAttemptCognitive' : 'StudentAttempt';
    const attempt = _.find(attempts, { test: test._id, finished: null });
    if (attempt) {
      snack('Boa sorte!');
      FlowRouter.go(route, { testId: test._id });
    } else {
      Meteor.call('StudentAttemptStart', test._id, err => {
        if (err) {
          console.log(err);
          snack('Algo deu errado', 'orange warning');
        } else {
          snack('Boa sorte!');
          FlowRouter.go(route, { testId: test._id });
        }
      });
    }
  },

  handleRedoClick() {
    const { attempt } = this.props;
    Meteor.call('StudentTestRedoWrongs', { attemptId: attempt._id }, (err, res) => {
      if (err) {
        console.log(err);
        snack(':(');
      } else {
        Meteor.call('StudentAttemptStart', res._id, err => {
          if (err) {
            console.log(err);
            snack('Algo deu errado', 'orange warning');
          } else {
            snack('Boa sorte!');
            FlowRouter.go('StudentTestAttempt', { testId: res._id });
          }
        });
      }
    });
  },

  render() {
    const { attempt, attempts, test } = this.props;

    const _attempts = _.sortBy(_.filter(attempts, 'finishedAt'), 'finishedAt');
    const _attempt = _.last(_.sortBy(attempts, 'startedAt'));
    const buttonLabel = (
      !_attempt ? 'Fazer Todas' :
      _attempt.finished ? 'Refazer Todas' :
      'Continuar'
    );

    return (
      <div className='ui basic segment' style={{ marginBottom: 0 }}>
        <RaisedButton
          primary={true}
          label='Refazer Erradas'
          style={{ float: 'right' }}
          primary={true}
          onClick={this.handleRedoClick}
        />
        <FlatButton
          secondary={true}
          label={buttonLabel}
          style={{ float: 'right' }}
          onClick={this.handleTestStart}
        />
        <h1 className='ui header' style={{ marginTop: 0 }}>
          <div className='content'>
            {`Tentativa ${_.indexOf(_.map(_attempts, '_id'), attempt._id) + 1}`}
            <div className='sub header'>{moment(attempt.finishedAt).format('LL')}</div>
          </div>
        </h1>
      </div>
    );
  },
});

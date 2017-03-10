import React from 'react';
import { RaisedButton } from 'material-ui';

const StudentAttemptByTagsTitle = React.createClass({

  handleTestStart() {
    const { test, attempts } = this.props;
    const attempt = _.find(attempts, { test: test._id, finished: null });
    if (attempt) {
      snack('Boa sorte!');
      FlowRouter.go('StudentAttemptStart', { testId: test._id });
    } else {
      Meteor.call('StudentAttemptStart', test._id, err => {
        if (err) {
          console.log(err);
          snack('Algo deu errado', 'orange warning');
        } else {
          snack('Boa sorte!');
          FlowRouter.go('StudentAttemptStart', { testId: test._id });
        }
      });
    }
  },

  render() {
    const { attempt, attempts, test } = this.props;

    const _attempts = _.sortBy(_.filter(attempts, 'finishedAt'), 'finishedAt');
    const _attempt = _.last(_.sortBy(attempts, 'startedAt'));
    const buttonLabel = (
      !_attempt ? 'Fazer teste' :
      _attempt.finished ? 'Refazer teste' :
      'Continuar'
    );

    return (
      <div className='ui basic segment' style={{ marginBottom: 0 }}>
        <RaisedButton
          primary={true}
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

export default StudentAttemptByTagsTitle;

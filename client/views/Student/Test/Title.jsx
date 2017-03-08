import React from 'react';
import { RaisedButton, FontIcon } from 'material-ui';

const StudentTestTitle = React.createClass({

  handleTestStart() {
    const { test, attempts } = this.props;
    const route = _.get(test, 'type') === 'cognitive'
      ? 'StudentTestAttemptCognitive' : 'StudentTestAttempt';
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

  /* Render
  */

  render() {
    const { test, subjects, attempts } = this.props;

    const attempt = _.last(_.sortBy(attempts, 'startedAt'));
    const buttonLabel = (
      !attempt ? 'Fazer' :
      attempt.finished ? 'Refazer' :
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
            {test.name}
            <div className='sub header'>
              {_.map(test.subjects, s => _.get(_.find(subjects, { _id: s }), 'name')).join(' ')}
            </div>
          </div>
        </h1>
      </div>
    );
  },
});

export default StudentTestTitle;

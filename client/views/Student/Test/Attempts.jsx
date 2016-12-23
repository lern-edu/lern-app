import React from 'react';
import { List, ListItem } from 'material-ui';

StudentTestAttempts = React.createClass({
  render() {
    const { attempts, test } = this.props;
    const atts = _.sortBy(_.filter(attempts, 'finishedAt'), 'finishedAt');

    const route = _.get(test, 'type') === 'cognitive'
      ? 'StudentAttemptCognitive' : 'StudentAttempt';

    return _.isEmpty(atts) ? (
      <div className='ui basic segment'>
        <div className='ui light grey header'>
          Sem tentativas ainda
        </div>
      </div>
    ) : (
      <List subheader='Desempenho por Questão'>
        {_.map(atts, (attempt, i) =>
          <ListItem
            key={attempt._id}
            primaryText={`Tentativa ${i + 1}`}
            secondaryText={moment(attempt.finishedAt).fromNow()}
            href={FlowRouter.path(route, { testId: test._id, attemptId: attempt._id })}
          />
        )}
      </List>
    );
  },
});

import React from 'react';
import { List, ListItem, Subheader, Paper } from 'material-ui';

const StudentTestAttempts = React.createClass({
  render() {
    const { attempts, test } = this.props;
    const atts = _.sortBy(_.filter(attempts, 'finishedAt'), 'finishedAt');

    return _.isEmpty(atts) ? (
      <Paper className='ui basic segment'>
        <div className='ui light grey header'>
          Sem tentativas ainda
        </div>
      </Paper>
    ) : (
      <Paper className='ui basic segment'>
        <List>
          <Subheader>Tentativas</Subheader>

          {
            _.map(atts, (attempt, i) =>
              <ListItem
                key={attempt._id}
                primaryText={`Tentativa ${i + 1}`}
                secondaryText={moment(attempt.finishedAt).fromNow()}
                href={
                  FlowRouter.path(
                    `StudentAttempt${test.get('resolution')}`,
                    {
                      testId: test._id,
                      attemptId: attempt._id,
                    }
                  )
                }
              />
            )
          }

        </List>
      </Paper>
    );
  },
});

export default StudentTestAttempts;

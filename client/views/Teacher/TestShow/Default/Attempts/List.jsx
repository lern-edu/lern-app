import React from 'react';
import { ListItem, List, FontIcon, Divider } from 'material-ui';

TeacherTestShowDefaultList = React.createClass({

  // handlers

  handleGo({ currentTarget }) {
    const { props: { attempts, course: { _id: courseId }, test: { _id: testId } } } = this;
    const attempt = _.find(attempts, { _id: currentTarget.getAttribute('data-key') });
    if (attempt.finished)
      FlowRouter.go('TeacherAttemptGrade', { courseId, testId, attemptId: attempt._id });
  },

  // Render

  render() {
    const { students, attempts, filter, test } = this.props;

    const groupAttempts = _.groupBy(
      _.filter(attempts, ({ finished, grade }) =>
        _.get({
            all: true,
            running: !finished,
            finished: finished && _.isNull(grade),
            corrected: !_.isNull(grade),
          },
          filter
        )
      ), 'author'
    );

    const countScore = _.sum(
      _.flatten(
        _.map(test.get('pages'), ({ content }) =>
          _.map(content, c => _.get(c, 'score') || 0)
        )
      )
    );

    return (
      <List>
       {_.map(students, ({ _id, profile: { name } }) => [
         <ListItem
          key={_id}
          primaryText={name}
          secondaryText={_.isEmpty(groupAttempts[_id]) ? 'Nenhuma tentativa realizada'
            : `Tentativas realizadas ${_.get(groupAttempts, `${_id}.length`)}`}
          leftIcon={<FontIcon className='material-icons'>person</FontIcon>}
          nestedItems={_.isEmpty(groupAttempts[_id]) ? [] :
            _.map(_.sortBy(groupAttempts[_id], 'finishedAt'),
            ({ _id, finished, grade, score, startedAt, finishedAt }, index) =>
            <ListItem key={_id}
              data-key={_id}
              primaryText={`Tentativa ${index + 1}`}
              secondaryText={
                  <p>
                    {
                      !finished ? 'Em andamento'
                      : finished && _.isNull(grade) ? 'Terminada'
                      : `Corrigido -- Pontuação: ${
                        Math.round(countScore * grade)
                      } de ${countScore}`
                    }
                    <br/>
                      {
                        `Gastou ${
                          moment.duration(moment(startedAt).diff(moment(finishedAt))).humanize()
                        }`
                      }
                  </p>
              }
              secondaryTextLines={2}
              leftIcon={
                <FontIcon className='material-icons'>
                {
                  !finished ? 'access_time'
                  : finished && _.isNull(grade) ? 'done'
                  : 'done_all'
                }
              </FontIcon>}
            disabled={!finished}
            onTouchTap={this.handleGo}
          />)} />, <Divider />,
       ])}
      </List>
    );
  },
});

import React from 'react';
import { ListItem, IconButton, FontIcon } from 'material-ui';

StudentTestsListItem = React.createClass({
  categories: {
    todo() {
      const { test, attempts, subjects } = this.props;
      const attempt = _.find(attempts, { test: test._id });
      const tooltip = attempt ? 'Continuar' : 'Começar';
      return {
        secondaryText: _.map(test.subjects, s => _.get(_.find(subjects, { _id: s }), 'name')).join(' '),
        rightIconButton: (
          <IconButton tooltip={tooltip} touch={true} onClick={this.handleTestStart}>
            <FontIcon className='material-icons'>create</FontIcon>
          </IconButton>
        ),
      };
    },

    done(props) {
      const { test, attempts, subjects } = this.props;
      const attempt = _.find(_.sortBy(attempts, 'finishedAt').reverse(), { test: test._id });
      const icon = (
          !_.isFinite(attempt.grade) ? null
        : attempt.grade < 0.3 ? 'star_border'
        : attempt.grade < 0.7 ? 'star_half'
        : 'star'
      );
      return {
        secondaryText: _.map(test.subjects, s => _.get(_.find(subjects, { _id: s }), 'name')).join(' '),
        rightIconButton: !icon ? undefined : (
          <IconButton tooltip={numeral(attempt.grade).format('0%')} disabled={true} touch={true}>
            <FontIcon className='material-icons'>{icon}</FontIcon>
          </IconButton>
        ),
      };
    },

    sched(props) {
      const { test, subjects } = this.props;
      return {
        secondaryText: _.map(test.subjects, s => _.get(_.find(subjects, { _id: s }), 'name')).join(' '),
        rightIcon: <FontIcon className='material-icons'>event</FontIcon>,
      };
    },
  },

  /* Handlers
  */

  handleTestStart(event) {
    event.stopPropagation();
    const { test, attempts } = this.props;
    const attempt = _.find(attempts, { test: test._id, finished: null });
    if (attempt) {
      snack('Boa sorte!');
      FlowRouter.go('StudentTestAttempt', { testId: test._id });
    } else {
      Meteor.call('StudentAttemptStart', test._id, err => {
        if (err) {
          console.log(err);
          snack('Algo deu errado', 'orange warning');
        } else {
          snack('Boa sorte!');
          FlowRouter.go('StudentTestAttempt', { testId: test._id });
        }
      });
    }
  },

  handleItemClick() {
    const { test } = this.props;
    FlowRouter.go('StudentTest', { testId: test._id });
  },

  /* Render
  */

  render() {
    const { active, test } = this.props;

    return (
      <ListItem
        primaryText={test.name}
        onClick={this.handleItemClick}
        {...this.categories[active].call(this)}
      />
    );
  },
});

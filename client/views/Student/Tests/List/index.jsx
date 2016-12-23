import React from 'react';
import { List, ListItem, Divider, Paper, FontIcon, IconButton } from 'material-ui';

StudentTestsList = React.createClass({

  categories: {
    todo: {
      name: 'Pendentes',
      sortBy: 'name',

      labels: [
        { key: 'present', label: 'Hoje' },
        { key: 'past', label: 'Atrasados' },
      ],

      empty: {
        title: 'Pronto!',
        subtitle: 'Volte amanhã para continuar o treino',
        icon: 'done_all',
      },

      filterBy(test) {
        const { attempts, now } = this;
        const attempt = _.find(attempts, { test: test._id, finished: true });
        return !attempt && !moment(test.startDate).isAfter(now, 'day');
      },

      groupBy(test) {
        const { now } = this;
        return (
            moment(test.startDate).isBefore(now, 'day') ? 'past'
          : moment(test.startDate).isAfter(now, 'day') ? 'future'
          : 'present'
        );
      },
    },

    done: {
      name: 'Terminados',
      sortBy: 'name',

      labels: [
        { key: 'today', label: 'Hoje' },
        { key: 'week', label: 'Essa Semana' },
        { key: 'past', label: 'Resto' },
      ],

      empty: {
        title: null,
        subtitle: 'Nenhum treino realizado',
        icon: 'blur_on',
      },

      filterBy(test) {
        const { attempts, now } = this;
        const attempt = _.find(attempts, { test: test._id, finished: true });
        return !!attempt;
      },

      groupBy(test) {
        const { now } = this;
        const date = moment(test.startDate);
        return (
            date.isSame(now, 'day') ? 'today'
          : date.isSame(now, 'week') ? 'week'
          : 'past'
        );
      },
    },

    sched: {
      name: 'Agendados',
      sortBy: 'name',

      labels: [
        { key: 'week', label: 'Essa Semana' },
        { key: 'present', label: 'Futuro' },
      ],

      empty: {
        title: 'Nada Planejado',
        subtitle: null,
        icon: 'event',
      },

      filterBy(test) {
        const { attempts, now } = this;
        const attempt = _.find(attempts, { test: test._id, finished: true });
        return !attempt && moment(test.startDate).isAfter(now, 'day');
      },

      groupBy(test) {
        const { now } = this;
        const date = moment(test.startDate);
        return (
            date.isSame(now, 'week')
            ? 'week' : 'future'
        );
      },
    },
  },

  /* Methods
  */

  groups(opts) {
    const ctx = _.assign({}, this.props, { now: _.now() });
    opts = _.mapValues(opts, v => _.isFunction(v) ? _.bind(v, ctx) : v);
    return (
      _.groupBy(
        _.sortBy(
          _.filter(this.props.tests,
          opts.filterBy),
        opts.sortBy),
      opts.groupBy)
    );
  },

  /* Render
  */

  render() {
    const { active } = this.props;
    const cat = this.categories[active];
    const groups = this.groups(cat);

    return _.isEmpty(groups) ? (
        <StudentTestsListEmpty category={cat}/>
      ) : (
        <Paper>
          {_.map(cat.labels, ({ key: k, label }, i) => !_.isEmpty(groups[k]) &&
            [
              i !== 0 ? <Divider /> : undefined,
              <List subheader={label} key={k}>
                {_.map(groups[k], (test, i) =>
                  <StudentTestsListItem
                    key={test._id}
                    test={test}
                    {...this.props}
                  />
                )}
              </List>,
            ]
          )}
        </Paper>
      );
  },
});

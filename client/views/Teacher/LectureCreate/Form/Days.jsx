import React from 'react';

TeacherLectureCreateFormDays = React.createClass({
  /* Lifecycle
  */

  getInitialState() {
    const { course } = this.props;

    const count = moment.duration(course.endDate - course.startDate).asDays();
    const allDays = _.map(_.range(count), i => moment(course.startDate).startOf('day').add(i, 'days'));
    const possibleDates = _.reduce(allDays, (memo, day) => {
      const scheds = _.filter(course.schedule, { day: WeekDays.all('keys')[day.day() - 1] });
      if (scheds.length === 1) memo.push({ day, sched: _.first(scheds), index: memo.length, compact: true });
      else _.forEach(scheds, sched => memo.push({ day, sched, index: memo.length, compact: false }));
      return memo;
    }, []);
    return { possibleDates, show: 3, more: possibleDates.length > 3 };
  },

  /* Handlers
  */

  handleMoreClick() {
    const { possibleDates, more, show } = this.state;
    this.setState({ show: show * 2, more: possibleDates.length > show * 2 });
  },

  /* Render
  */

  render() {
    const { possibleDates, show, more } = this.state;
    const { onClick, indexes } = this.props;

    const now = _.now();
    const visibleDates = _.take(_.filter(possibleDates, date => date.day > now), show);

    return (
      <div className='ui three column stackable grid'>
        {_.map(visibleDates, date =>
          <div className='column' key={date.index}>
            <Semantic.Button
              className={`ui fluid large label ${_.includes(indexes, date.index) ? 'blue' : 'basic'}`}
              onClick={onClick}
              date={date}
              tag='a'
              href='#'>{`${date.day.format('L')} ${date.compact ? '' : `às ${moment(date.sched.startDate).format('LT')}`}`}
            </Semantic.Button>
          </div>
        )}
        {!more ? undefined :
          <div className='centered column'>
            <Semantic.Button onClick={this.handleMoreClick}>
              Carregar mais datas
            </Semantic.Button>
          </div>
        }
      </div>
    );
  },
});

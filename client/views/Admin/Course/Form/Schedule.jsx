import React from 'react';

AdminCourseFormSchedule = React.createClass({
  /* Handlers
  */

  handleSchedChange(str, { name: day }) {
    const { form } = this.props;
    const schedule = form.doc.get('schedule') || [];
    _.remove(schedule, { day });

    const [s1, s2] = str.split('-');

    if (s1 && s2) {
      const [m1, m2] = [moment(s1, 'H:m'), moment(s2, 'H:m')];
      const sched = new Courses.DaySchema({ day, startDate: m1.toDate(), endDate: m2.toDate() });
      schedule.push(sched);
    }

    form.defaultHandler({ schedule }, { doc: true });
  },

  /* Render
  */

  render() {
    const { schedule } = this.props.form.doc;

    return (
      <div className='ui four column grid'>

        {_.map(WeekDays.all('both'), (v, k) =>
          <div className='column' key={k}>
            <Semantic.Popup parent={this} target={`${k}-popup`}>
              <div className='ui input'>
                <Semantic.Input placeholder={v} onInput={this.handleSchedChange} name={k}/>
              </div>
              <div className='ui popup' ref={`${k}-popup`}>
                {(ref = _.find(schedule, { day: k }))
                ? `${moment(ref.startDate).format('LT')} - ${moment(ref.endDate).format('LT')}`
                : 'Horário no formato: HH:mm - HH:mm'
                }
              </div>
            </Semantic.Popup>
          </div>
        )}

      </div>
    );
  },
});

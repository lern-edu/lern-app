import React from 'react';

const StudentCourseShowReportsStats = React.createClass({
  classes: 'two',
  stats: {
    score: {
      label: 'Obtido',
      value() {
        const { user, tests, attempts } = this.props;
        return _.sumBy(tests, test => {
          const attempt = _.find(attempts, { author: user._id, test: test._id });
          const totalScore = _.sum(test.scores);
          return totalScore && attempt && attempt.grade && attempt.grade * totalScore;
        });
      },
    },
    total: {
      label: 'Distribuído',
      value() {
        const { user, tests, attempts } = this.props;
        return _.sumBy(tests, test => {
          const attempt = _.find(attempts, { author: user._id, test: test._id });
          return _.sum(test.scores);
        });
      },
    },
  },

  /* Render
  */

  render() {
    return (
      <div className={`ui ${this.classes} statistics`}>
        {_.map(this.stats, (v, k) =>
          <div className='statistic' key={k}>
            <div className='value'>{v.value.call(this)}</div>
            <div className='label'>{v.label}</div>
          </div>
        )}
      </div>
    );
  },
});

export default StudentCourseShowReportsStats;

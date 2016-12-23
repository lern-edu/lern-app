import React from 'react';

TeacherTestShowInfoChart = React.createClass({

  // Lifecycle

  componentWillReceiveProps({ org }) {
    _.get({
      grade: this.createGradeChart(),
    }, org);
  },

  // Chartist

  createGradeChart() {
    const { students, grades, answers, attempts } = this.props;

    const serie = _.sortBy(_.map(grades, ({ attempts: at, student }) => {
      const { score, grade } = _.find(attempts, ({ _id }) => _.includes(at, _id)) || {};
      const name = _.get(_.find(students, { _id: student }), 'profile.name');
      const indexName = name.indexOf(' ') < 1 ? name
        : name.substring(0, name.indexOf(' ') + 2);
      return {
        student: indexName,
        grade: Math.round(score * grade),
      };
    }), ['student']);

    const data = {
      labels: _.map(serie, 'student'),
      series: [_.map(serie, 'grade')],
    };

    const opt = {
      axisY: {
        offset: 50,
      },
      reverseData: true,
      seriesBarDistance: 10,
      horizontalBars: true,
    };

    new Chartist.Bar(this.refs.chart, data, opt);
  },

  // Render

  render() {
    return <div ref='chart'/>;
  },
});

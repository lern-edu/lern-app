import React from 'react';
import { grey300 } from 'material-ui/styles/colors';

const StudentTestGrades = React.createClass({

  /* Lifecycle
  */

  componentDidMount() {
    const { chart } = this.refs;
    if (!chart) return;

    const { attempts } = this.props;
    const sorted = _.sortBy(attempts, 'finishedAt');

    const labels = _.map(sorted, test => moment(test.startedAt).fromNow());
    const grades = _.map(sorted, test => test.grade * 100);

    var data = { labels, series: [grades] };

    new Chartist.Bar(this.refs.chart, data);
  },

  /* Render
  */

  render() {
    const { attempts } = this.props;
    const grades = _.map(attempts, 'grade');
    return !_.every(grades, _.isNull) ? (
      <div className='ui basic segment'>
        <div>Desempenho por tentativa</div>
        <div ref='chart' />
      </div>
    ) : (
      <div className='ui basic segment'>
        <div className='ui header' style={{ color: grey300 }}>
          Sem notas para essa prova
        </div>
      </div>
    );
  },
});

export default StudentTestGrades;

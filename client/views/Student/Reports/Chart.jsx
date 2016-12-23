import React from 'react';

StudentReportsChart = React.createClass({
  getTagData(tagId) {
    const { questions, answers } = this.props;

    const qs = _.filter(questions, question => _.includes(question.tags, tagId));
    const qsIds = _.map(qs, '_id');
    const ans = _.filter(answers, answer => _.includes(qsIds, answer.question));

    return {
      total: ans.length,
      hits: _.filter(ans, { grade: 1 }).length,
      misses: _.filter(ans, { grade: 0 }).length,
    };
  },

  getSubjectData() {
    const { questions, answers, subjectId } = this.props;

    const qs = _.filter(questions, question => _.isEqual(question.subject, subjectId));
    const qsIds = _.map(qs, '_id');
    const ans = _.filter(answers, answer => _.includes(qsIds, answer.question));

    const data = {
      total: ans.length,
      hits: _.filter(ans, { grade: 1 }).length,
      misses: _.filter(ans, { grade: 0 }).length,
    };

    return data.total <= 0 ? 0 : data.hits / data.total * 100;
  },

  componentDidMount() {
    const node = this.refs.chart;

    const { subjectId, tags } = this.props;

    const _tags = _.filter(tags, { subject: subjectId });
    const serie = _.map(_tags, tag => {
      const data = this.getTagData(tag._id);
      return data.total <= 0 ? 0 : data.hits / data.total;
    });

    const data = {
      labels: _.union(['Geral'], _.map(_tags, 'text')),
      series: [_.union([this.getSubjectData()], _.map(serie, s => s * 100))],
    };

    const opts = {
      axisY: {
        position: 'start',
        offset: 200,
      },
      axisX: {
        type: Chartist.FixedScaleAxis,
        high: 100,
        low: 0,
        ticks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        labelOffset: {
          x: -10,
        },
      },
      height: _tags.length * 50,
      horizontalBars: true,
      chartPadding: {
        top: 0,
        right: 10,
        bottom: 0,
        left: 0,
      },
    };

    new Chartist.Bar(node, data, opts);
  },

  render() {
    return (
      <div ref='chart'/>
    );
  },
});

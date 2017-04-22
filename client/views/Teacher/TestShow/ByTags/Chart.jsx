// Lib
import _ from 'lodash';
import React from 'react';
import Chart from 'chart.js';
import { Card, CardMedia, CardText, List, Paper } from 'material-ui';
import { ListItem, Avatar, Chip, Subheader } from 'material-ui';

// Views
import TeacherTestShowByTagsTableChartToolbar from './Toolbar.jsx';

const TeacherTestShowByTagsTableChart = React.createClass({

  // Lifecycle

  getInitialState() {
    return { dataType: 'overall', avaregeTags: [] };
  },

  componentDidMount() {
    this.callFunction();
  },

  componentWillReceiveProps(nextProps) {
    this.callFunction(nextProps);
  },

  // Functions

  callFunction(props, state) {
    switch (state || this.state.dataType) {
      case 'overall':
        this.createChartData(props || this.props);
        break;
      case 'compare':
        this.createChartDataCompare(props || this.props);
        break;
    }
  },

  createColor(hex) {
    return _.join(
      hex.replace(
        /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        (m, r, g, b) =>
          '#' + r + r + g + g + b + b
      )
      .substring(1).match(/.{2}/g)
      .map(x => parseInt(x, 16)),
      ','
    );
  },

  createChartData({ query }) {
    const { answers, questions, tags, students, course } = this.props;
    const { chart } = this.refs;
    const { selectedStudents } = query;

    // define label
    const validAttempts = _.values(_.omit(query, 'selectedStudents'));
    const orderedTags = _.orderBy(tags, ['text']);
    const labels = _.map(orderedTags, 'text');
    const tagsIds = _.map(orderedTags, '_id');

    // calc performance
    const groupedQuestions = _.mapValues(
      _.groupBy(questions, ({ tags }) => _.head(tags)),
      (qs) => _.map(qs, '_id')
    );
    const avaregeTags = _.map(tagsIds, t =>
      _.meanBy(
        _.map(
          _.filter(answers, ({ question, author, attempt, type }) =>
            _.includes(
              _.get(groupedQuestions, t),
              question
            )
            && type === 'number'
            && _.includes(selectedStudents, author)
            && _.includes(validAttempts, attempt)
          ),
          ({ answer }) => _.isNaN(_.toNumber(answer)) ? 0 : _.toNumber(answer)
        )
      )
    );

    this.setState({ avaregeTags });

    const node = new Chart(chart, {
      type: 'radar',
      data: {
        labels,
        datasets: [
          {
            label: _.get(course, 'name'),
            backgroundColor: 'rgba(33,150,243,0.2)',
            borderColor: 'rgba(33,150,243,1)',
            pointBackgroundColor: 'rgba(33,150,243,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(33,150,243,1)',
            data: avaregeTags,
          },
        ],
      },
      options: {
        legend: {
          display: true,
        },
        scale: {
          ticks: {
            beginAtZero: true,
            min: _.get(_.find(questions, { type: 'number' }), 'range.min'),
            max: _.get(_.find(questions, { type: 'number' }), 'range.max'),
          },
        },
      },
    });

  },

  createChartDataCompare({ query }) {
    const { answers, questions, tags, students, course } = this.props;
    const { chart } = this.refs;
    const { selectedStudents } = query;

    // define label
    const validAttempts = _.values(_.omit(query, 'selectedStudents'));
    const orderedTags = _.orderBy(tags, ['text']);
    const labels = _.map(orderedTags, 'text');
    const tagsIds = _.map(orderedTags, '_id');

    // calc performance
    const groupedQuestions = _.mapValues(
      _.groupBy(questions, ({ tags }) => _.head(tags)),
      (qs) => _.map(qs, '_id')
    );
    const avaregeTags = _.map(tagsIds, t =>
      _.meanBy(
        _.map(
          _.filter(answers, ({ question, author, attempt, type }) =>
            _.includes(
              _.get(groupedQuestions, t),
              question
            )
            && type === 'number'
            && _.includes(selectedStudents, author)
            && _.includes(validAttempts, attempt)
          ),
          ({ answer }) => _.isNaN(_.toNumber(answer)) ? 0 : _.toNumber(answer)
        )
      )
    );

    this.setState({ avaregeTags });

    const avaregePerStudent = _.map(selectedStudents, studentId =>
      _.zipObject(
        ['student', 'name', 'data'],
        [
          studentId,
          _.get(
            _.find(students, { _id: studentId }),
            'profile.name'
          ),
          _.map(tagsIds, t =>
            _.meanBy(
              _.map(
                _.filter(answers, ({ question, author, attempt, type }) =>
                  type === 'number'
                  && _.includes(
                    _.get(groupedQuestions, t),
                    question
                  )
                  && studentId === author
                  && _.get(query, studentId) === attempt
                ),
                ({ answer }) => _.isNaN(_.toNumber(answer)) ? 0 : _.toNumber(answer)
              )
            )
          ),
        ]
      )
    );

    const node = new Chart(chart, {
      type: 'radar',
      data: {
        labels,
        datasets: _.map(
          avaregePerStudent,
          ({ student, name, data }) => {
            const color = this.createColor(`#${Random.hexString(6)}`);
            return {
              label: name,
              backgroundColor: `rgba(${color},0.2)`,
              borderColor: `rgba(${color},1)`,
              pointBackgroundColor: `rgba(${color},1)`,
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: `rgba(${color},1)`,
              data: data,
            };
          }
        ),
      },
      options: {
        legend: {
          display: true,
        },
        scale: {
          ticks: {
            beginAtZero: true,
            min: _.get(_.find(questions, { type: 'number' }), 'range.min'),
            max: _.get(_.find(questions, { type: 'number' }), 'range.max'),
          },
        },
      },
    });
  },

  // Render

  render() {
    const { dataType, avaregeTags } = this.state;
    return (
      <Paper style={{ marginTop: 10 }} >
        <TeacherTestShowByTagsTableChartToolbar
          parent={this}
          {...this.state}
        />
        <div className='ui center aligned grid' >
          <div className='sixteen wide tablet nine wide computer column' >
            <canvas ref='chart' width={300} height={300} />
          </div>
        </div>
      </Paper>
    );
  },

});

export default TeacherTestShowByTagsTableChart;

// Lib
import React from 'react';
import Chart from 'chart.js';
import { Card, CardMedia, CardText, List } from 'material-ui';
import { ListItem, Avatar, Chip, Subheader } from 'material-ui';

const StudentAttemptByTagsData = React.createClass({

  // Lifecycle

  getInitialState() {
    return { avaregeQuestions: null, tagsIds: null };
  },

  componentDidMount() {
    const { refs: { chart }, props: { answers, questions, tags, user } } = this;

    // define label
    const orderedTags = _.orderBy(tags, ['text']);
    const labels = _.map(orderedTags, 'text');
    const tagsIds = _.map(orderedTags, '_id');

    // calc performance
    const groupedQuestions = _.groupBy(questions, ({ tags }) => _.head(tags));
    const avaregeQuestions = _.map(tagsIds, t =>
      _.mean(
        _.map(
          _.get(groupedQuestions, t),
          ({ _id }) =>
            _.toNumber(
              _.get(
                _.find(answers, { question: _id }),
              'answer')
            )
        )
      )
    );

    // upadate state
    this.setState({ tagsIds, avaregeQuestions });

    const node = new Chart(chart, {
      type: 'radar',
      data: {
        labels,
        datasets: [
          {
            label: _.get(user, 'profile.name'),
            backgroundColor: 'rgba(33,150,243,0.2)',
            borderColor: 'rgba(33,150,243,1)',
            pointBackgroundColor: 'rgba(33,150,243,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(33,150,243,1)',
            data: avaregeQuestions,
          },
        ],
      },
      options: {
        legend: {
          display: false,
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
    const {
      props: { user: { profile: { name, profilePic } }, tags },
      state: { tagsIds, avaregeQuestions },
    } = this;
    return (
      <div className='ui center aligned grid' style={{ marginTop: 10 }}>
        <Card className='sixteen wide tablet seven wide computer column' >
          <CardText>
            <List>
                <Subheader>
                  Média geral: {numeral(_.mean(avaregeQuestions) || 0).format('0.00')}
                </Subheader>
                <ListItem
                  disabled={true}
                  children={
                    <div key='avarege' style={{ display: 'flex', flexWrap: 'wrap' }}>
                      {
                        _.map(tagsIds, (id, index) =>
                          <Chip key={id} style={{ margin: 4 }} >
                            {
                              _.get(_.find(tags, { _id: id }), 'text')
                            }: {
                              _.isNaN(_.get(avaregeQuestions, index))
                              ? 'Sem valor'
                              : numeral(_.get(avaregeQuestions, index)).format('0.00')
                            }
                          </Chip>
                        )
                      }
                    </div>
                  }
                  />
            </List>
          </CardText>
        </Card>
        <div className='sixteen wide tablet nine wide computer column'>
          <canvas ref='chart' width={300} height={300} />
        </div>
      </div>
    );
  },

});

export default StudentAttemptByTagsData;

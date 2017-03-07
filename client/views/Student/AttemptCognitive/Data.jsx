import React from 'react';
import { Card, CardMedia, CardText, List, ListItem, Avatar, FontIcon, Subheader } from 'material-ui';

StudentAttemptCognitiveAnswers = React.createClass({

  getInitialState() {
    return { avaregeQuestions: null, avaregeEntrepeneur: null, tagsIds: null };
  },

  // static data

  entrepeneurData: {
    'dMPH4XToypCGjWm3s': 8.1,
    'aaFhkXjcDwsTxmS3Z': 8.9,
    'rh59gcHjLRYdcoqan': 8.9,
    'Ekn5QwTEGrLxFLH9y': 9.1,
    '8oPm9rs8ZJojXS9Z8': 9.0,
    'XNFyWkYM2jFv42gE5': 8.2,
    'k3QuioXc5e58NfpfY': 8.5,
    'm5ZERR3w2aYNgejGH': 8.3,
    '9MsQL7oSWL6RsGCuJ': 8.4,
    'sBeagbN5pD2TbpMQM': 8.6,
  },

  // Lifecycle

  componentDidMount() {
    const { refs: { chart }, props: { answers, questions, tags, user }, entrepeneurData } = this;

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

    // calc success entrepeneur
    const avaregeEntrepeneur = _.map(tagsIds, t => _.get(entrepeneurData, t));

    // upadate state
    this.setState({ tagsIds, avaregeQuestions, avaregeEntrepeneur });

    const data = {
      labels,
      series: [
        { className: 'user', name: _.get(user, 'profile.name'), data: avaregeQuestions },
        { className: 'entrepeneur', name: 'Empreendedor de sucesso', data: avaregeEntrepeneur },
      ],
    };

    const node = new Chartist.Bar(chart, data, {
      seriesBarDistance: 10,
    });

    // node.on('draw', (e1, e2, e3) => {
    //   console.log(e1, e2, e3);
    // });
  },

  // Render

  render() {
    const { props: { user, tags },
      state: { tagsIds, avaregeQuestions, avaregeEntrepeneur, }, } = this;
    return (
      <Card>
        <CardText>
          <List>
            <Subheader>Legenda</Subheader>
            <ListItem
              primaryText={_.get(user, 'profile.name')}
              leftIcon={<FontIcon className="material-icons" color='#2196F3'>person</FontIcon>}
              nestedItems={_.map(tagsIds, (id, index) =>
                <ListItem key={id} primaryText={_.get(_.find(tags, { _id: id }), 'text')}
                secondaryText={<p>Sua média: <b>{_.get(avaregeQuestions, index)}</b>
                -- Empreendedores de sucesso: <b>{_.get(avaregeEntrepeneur, index)}</b></p>}
                disabled={true}/>)}
              />
            <ListItem
              primaryText='Empreendedores de sucesso'
              leftIcon={<FontIcon className="material-icons" color='#FFC107'>star</FontIcon>}
            />
          </List>
        </CardText>
        <CardMedia><div ref='chart' /></CardMedia>
      </Card>
    );
  },

});

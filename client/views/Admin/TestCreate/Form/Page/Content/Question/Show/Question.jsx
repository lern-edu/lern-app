// Libs
import React from 'react';
import { green500 } from 'material-ui/styles/colors';
import { TextField } from 'material-ui';
import { Card, CardHeader, CardActions, Divider } from 'material-ui';
import { FlatButton, CardText, CardTitle, FontIcon } from 'material-ui';

const AdminTestCreateFormPageQuestionSearchShowQuestion = React.createClass({

  // Lifecycle

  getInitialState() {
    return { score: null };
  },

  // Static

  answer: <FontIcon className='material-icons' color={green500} >done</FontIcon>,

  column: {
    className:
      'five wide computer eight wide tablet sixteen wide mobile column',
  },

  // Handlers

  handleScoreChange({ currentTarget }, value) {
    const score = parseInt(value);
    if (score || value == '') this.setState({ score });
    else return;
  },

  handleQuestionAdd() {
    const { form, question } = this.props;
    const { score } = this.state;
    form.defaultHandler({ question: question._id, score }, { doc: true });
    form.handleSubmit();
  },

  // Render

  render() {
    const { question, subjects, tags, questionsSelected, scored } = this.props;
    const { score } = this.state;

    return (
      <div {...this.column} >
        <Card style={{ padding: 5 }} >
          <CardHeader
            title={_.get(_.find(subjects, { _id: question.subject }), 'name')}
            subtitle={_.map(question.tags, _id =>
              _.get(_.find(tags, { _id }), 'text')
            ).join(', ')}
            actAsExpander={true}
            showExpandableButton={true} />
          <CardActions>
            {!(scored && _.includes(['open', 'closed'], question.type)) ?
              undefined : <TextField
                value={this.state.score || ''}
                floatingLabelText='Pontuação'
                onChange={this.handleScoreChange} />}
            <FlatButton
              primary={true}
              label='Adicionar'
              disabled={_.includes(questionsSelected, question._id)
                || (scored && !score)}
              onTouchTap={this.handleQuestionAdd} />
          </CardActions>
          <CardText expandable={true}>
            {_.map(question.statement, (c, i) => [
              <div key={i} >
                {_.get({
                  text: <p>{c.text}</p>,
                  link: <a>{c.link}</a>,
                  title: <CardTitle title={c.title} />,
                }, c.type)}
              </div>, <br/>,
            ])}
            <Divider />
            <CardTitle subtitle='Resposta' />
            {_.get({
              open: <p>{question.answer}</p>,
              unwasered: <p>Sem resposta</p>,
              number: <p>De {_.get(question, 'range.min')} até {_.get(question, 'range.max')}</p>,
              closed: _.map(question.options, (op, i) =>
                op.text ? <p key={op.text} >
                  {i == question.answer ? this.answer : undefined}{op.text}</p> :
                <p key={op.image} >
                  {i == question.answer ? this.answer : undefined}
                  Imagem a definir</p>,
              ),
            }, question.type)}
          </CardText>
        </Card>
      </div>
    );
  },
});

export default AdminTestCreateFormPageQuestionSearchShowQuestion;

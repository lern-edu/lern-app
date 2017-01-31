// Libs
import React from 'react';
import { green500 } from 'material-ui/styles/colors';
import { TextField, CardHeader, CardActions, Divider } from 'material-ui';
import { FlatButton, CardText, CardTitle } from 'material-ui';
import { FontIcon, CircularProgress } from 'material-ui';

const AdminTestCreateFormPageCreateContentShowQuestionView = React.createClass({

  // Static

  answer: <FontIcon className='material-icons' color={green500} >done</FontIcon>,

  // Handlers

  handleScoreChange({ currentTarget }, value) {
    const score = parseInt(value);
    if (score || value == '')
      this.props.form.defaultHandler({ score }, { doc: true });
    else return;
  },

  // Render

  render() {
    const { question, subject, tags, scored, ready, score } = this.props;

    return (
      !_.every(ready) ? <CircularProgress size={60} thickness={7} /> :
      <div>
        <CardHeader
          title={_.get(subject, 'name')}
          subtitle={_.map(question.tags, _id =>
            _.get(_.find(tags, { _id }), 'text')
          ).join(', ')}
          actAsExpander={true}
          showExpandableButton={true} />
        <CardActions>
          {!(scored && _.includes(['open', 'closed'], question.type)) ?
            undefined : <TextField
              value={score || ''}
              floatingLabelText='Pontuação'
              onChange={this.handleScoreChange} />}
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
      </div>
    );
  },
});

export default AdminTestCreateFormPageCreateContentShowQuestionView;

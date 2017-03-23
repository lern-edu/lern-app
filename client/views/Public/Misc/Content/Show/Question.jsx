// Libs
import React from 'react';
import { green500, red500 } from 'material-ui/styles/colors';
import { TextField, ListItem, Divider } from 'material-ui';
import { FlatButton } from 'material-ui';
import { FontIcon, CircularProgress } from 'material-ui';
import { Editor, EditorState, convertFromRaw } from 'draft-js';

const PublicContentShowQuestionView = React.createClass({

  // Static

  answer: <FontIcon className='material-icons' color={green500} >done</FontIcon>,
  notAnswer: <FontIcon className='material-icons' color={red500} >clear</FontIcon>,

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
        <div className='row'>
          <ListItem
            disabled={true}
            primaryText={_.get(subject, 'name')}
            secondaryText={_.map(question.tags, _id =>
              _.get(_.find(tags, { _id }), 'text')
            ).join(', ')} />
        </div>

        <div className='row'>
          {!(scored && _.includes(['open', 'closed'], question.type)) ?
            undefined : <TextField
              value={score || ''}
              floatingLabelText='Pontuação'
              onChange={this.handleScoreChange} />}
        </div>

        <div className='row'>
          {_.map(question.content, (c, i) =>
            <div key={'content' + i} >
              {_.get({
                image:
                  [console.log('image', c.type),
                  <PublicContentShowImage
                    imageId={c.image}
                  />],
                text:
                  [console.log('text', c.type),
                  <Editor
                    readOnly={true}
                    editorState={EditorState.createWithContent(
                      convertFromRaw(c.text)
                    )}
                  />],
                link: <a>{c.link}</a>,
                title: <h5>{c.title}</h5>,
              }, c.type)}
            </div>
          )}
        </div>

        <div className='row'>
          <Divider />
        </div>

        <div className='row'>
          <h4>Resposta</h4>
        </div>

        <div className='row'>
          {_.get({
            open: <p>{question.answer}</p>,
            unwasered: <p>Sem resposta</p>,
            number: <p>De {_.get(question, 'range.min')} até {_.get(question, 'range.max')}</p>,
            closed: _.map(question.options, (op, i) =>
              op.text ?
                <div key={i} >
                  {i == question.answer ? this.answer : this.notAnswer}
                  <span style={{ display: 'inline-block',
                                position: 'relative',
                                transform: 'translate(0, -50%)',
                              }}>
                    <Editor
                      readOnly={true}
                      editorState={EditorState.createWithContent(
                        convertFromRaw(op.text))} />
                  </span>
                </div>
                :
                <div key={op.image} >
                  {i == question.answer ? this.answer : this.notAnswer}
                  <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                    <PublicContentShowImage
                      imageId={op.image}
                    />
                </span>
                </div>,
            ),
          }, question.type)}
        </div>

      </div>
    );
  },
});

export default PublicContentShowQuestionView;

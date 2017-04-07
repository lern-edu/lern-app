// Libs
import React from 'react';
import { green500 } from 'material-ui/styles/colors';
import { TextField } from 'material-ui';
import { Card, CardHeader, CardActions, Divider } from 'material-ui';
import { FlatButton, CardText, CardTitle, FontIcon } from 'material-ui';
import { Editor, EditorState, convertFromRaw } from 'draft-js';

const PublicContentCreateTestShowQuestion = React.createClass({

  // Static

  answer: <FontIcon className='material-icons' color={green500} >done</FontIcon>,

  column: {
    className:
      'eight wide computer sixteen wide tablet sixteen wide mobile column',
  },

  // Handlers

  handleTestAdd() {
    const { form, test, parent } = this.props;
    form.defaultHandler({ test: test._id }, { doc: true });
    form.handleSubmit();
  },

  // Render

  render() {
    const { test, subjects, tags } = this.props;

    return (
      <div {...this.column} >
        <Card style={{ padding: 5 }} >

          <CardTitle title={test.get('name')} />

          <CardHeader
            title={
              _.map(test.subjects, _id =>
                _.get(
                  _.find(subjects, { _id }), 'name')
              ).join(', ')
            }
            subtitle={
              _.map(test.tags, _id =>
                _.get(
                  _.find(tags, { _id }), 'text')
              ).join(', ')
            }
            actAsExpander={true}
            showExpandableButton={true}
          />

          <CardActions>
            <FlatButton
              primary={true}
              label='Adicionar'
              onTouchTap={this.handleTestAdd}
            />
          </CardActions>

          <CardText expandable={true}>
            {_.map(test.info, (c, i) => [
              <div key={i} >
                {_.get({
                  text: <Editor
                      readOnly={true}
                      editorState={c.text && EditorState.createWithContent(
                        convertFromRaw(c.text))} />,
                  link: <a>{c.link}</a>,
                  title: <CardTitle title={c.title} />,
                }, c.type)}
              </div>, <br/>,
            ])}
          </CardText>

        </Card>
      </div>
    );
  },
});

export default PublicContentCreateTestShowQuestion;

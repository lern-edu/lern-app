// Libs
import React from 'react';
import { Paper, FlatButton } from 'material-ui';
import { Editor, EditorState, convertFromRaw } from 'draft-js';

// Views
import PublicContentShowQuestion from './QuestionContainer.jsx';

PublicContentShow = React.createClass({
  mixins: [AstroForm()],

  // Handlers

  handleRemove() {
    const { index, form, field, updateQuestionsSelected } = this.props;
    const contentArray = form.doc.get(field);
    _.pullAt(contentArray, index);
    form.defaultHandler({ [field]: contentArray }, { doc: true });
    if (this.doc.get('type') == 'question')
      updateQuestionsSelected && updateQuestionsSelected();
  },

  // Render

  render() {
    const { index, scored } = this.props;
    const text = this.doc.get('text');

    return (
      <Paper style={{ padding: 15 }}>
        {_.get({
          text: <Editor
              readOnly={true}
              editorState={text && EditorState.createWithContent(
                convertFromRaw(text))} />,
          link: <a>{this.doc.get('link')}</a>,
          title: <h4>{this.doc.get('title')}</h4>,
          question: <PublicContentShowQuestion
            score={this.doc.get('score')}
            form={this}
            questionId={this.doc.get('question')}
            scored={scored} />,
        }, this.doc.get('type'))}

        <br/>

        <FlatButton
          onTouchTap={this.handleRemove}
          secondary={true}
          label='Remover' />
      </Paper>
    );
  },

});

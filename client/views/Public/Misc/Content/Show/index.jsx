// Libs
import React from 'react';
import { Paper, FlatButton } from 'material-ui';
import { Editor, EditorState, convertFromRaw } from 'draft-js';

// Views
import PublicContentShowQuestion from './QuestionContainer.jsx';
import PublicContentShowImage from './ImageContainer.jsx';
import PublicContentRichText from './../RichText.jsx';

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
    if (this.doc.get('type') == 'image') {
      FS.Images.remove({ _id: this.doc.get('image') }, function (err) {
        if (!err) snack('Imagem removida');
        else console.err(err);
      });
    }
  },

  // Render

  render() {
    const { index, scored, canRemove=true } = this.props;
    const text = this.doc.get('text');

    return (
      <div>

        {_.get({
          text: <PublicContentRichText
            editorState={text && EditorState.createWithContent(convertFromRaw(text))}
            parent={this}
            readOnly={true}
          />,
          link: <a>{this.doc.get('link')}</a>,
          title: <h4>{this.doc.get('title')}</h4>,
          image: <PublicContentShowImage
            form={this}
            imageId={this.doc.get('image')} />,
          question: <PublicContentShowQuestion
            score={this.doc.get('score')}
            form={this}
            questionId={this.doc.get('question')}
            scored={scored} />,
        }, this.doc.get('type'))}

        <br/>

        {!canRemove ? undefined : <FlatButton
          onTouchTap={this.handleRemove}
          secondary={true}
          label='Remover' />}
      </div>
    );
  },

});

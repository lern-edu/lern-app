// Libs
import React from 'react';
import { Paper, FlatButton } from 'material-ui';
import { Editor, EditorState, convertFromRaw } from 'draft-js';

// Views
import PublicContentShowQuestion from './QuestionContainer.jsx';
import PublicContentShowTest from './TestContainer.jsx';
import PublicContentShowImage from './ImageContainer.jsx';
import PublicContentRichText from './../RichText.jsx';
import PublicContentShowVideo from './Video.jsx';

PublicContentShow = React.createClass({
  mixins: [AstroForm()],

  // Handlers

  handleRemove() {
    const { index, form, field, updateQuestionsSelected } = this.props;
    const contentArray = form.doc.get(field);
    form.defaultHandler({ [field]: index }, { doc: true, operation: 'pull' });
    if (this.doc.get('type') == 'question')
      updateQuestionsSelected && updateQuestionsSelected();
    if (this.doc.get('type') == 'image') {
      FS.Images.remove({ _id: this.doc.get('image') }, (err) => {
        if (!err) snack('Imagem removida');
        else console.error(err);
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
          image: <PublicContentShowImage
            form={this}
            imageId={this.doc.get('image')}
          />,
          question: <PublicContentShowQuestion
            score={this.doc.get('score')}
            form={this}
            questionId={this.doc.get('question')}
            scored={scored}
          />,
          test: <PublicContentShowTest
            form={this}
            testId={this.doc.get('test')}
          />,
          video: <PublicContentShowVideo
            form={this}
            videoId={this.doc.get('video')}
          />,
        }, this.doc.get('type'))}

        <br/>

        {
          !canRemove
          ? undefined
          : <FlatButton
            onTouchTap={this.handleRemove}
            secondary={true}
            label='Remover'
          />
        }
      </div>
    );
  },

});

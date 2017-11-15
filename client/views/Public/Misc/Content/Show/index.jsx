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
import PublicContentShowSudoku from './Sudoku.jsx';

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

    console.log(this);

    return (
      <div>

        {this.doc.get('type') == 'text' ?
          <PublicContentRichText
            editorState={text && EditorState.createWithContent(convertFromRaw(text))}
            parent={this}
            readOnly={true}
          />
          :
        this.doc.get('type') == 'link' ?
            <a>{this.doc.get('link')}</a>
          :
        this.doc.get('type') == 'image' ?
          <PublicContentShowImage
            form={this}
            imageId={this.doc.get('image')}
          />
          :
        this.doc.get('type') == 'question' ?
          <PublicContentShowQuestion
            score={this.doc.get('score')}
            form={this}
            questionId={this.doc.get('question')}
            scored={scored}
          />
          :
        this.doc.get('type') == 'test' ?
          <PublicContentShowTest
            form={this}
            testId={this.doc.get('test')}
          />
          :
        this.doc.get('type') == 'video' ?
          <PublicContentShowVideo
            form={this}
            videoId={this.doc.get('video')}
          />
          :
        this.doc.get('type') == 'sudoku' ?
          <PublicContentShowSudoku
            form={this}
            sudoku={this.doc.get('sudoku')}
            answer={this.props.answer}
            input={this.props.input}
            handleSudokuAnswer={this.props.handleSudokuAnswer}
          />
          :
        undefined}

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

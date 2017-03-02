// Libs
import React from 'react';
import { Paper, FlatButton } from 'material-ui';
import { Editor, EditorState, convertFromRaw } from 'draft-js';

import StudentTestAttemptPageContentQuestionView from './Question.jsx';

StudentTestAttemptPageContent = React.createClass({
  mixins: [AstroForm()],

  // Render

  render() {
    const { scored, questions } = this.props;
    const text = this.doc.get('text');

    return (
      <div style={{ padding: 15 }}>

        {_.get({
          text: <Editor
              readOnly={true}
              editorState={text && EditorState.createWithContent(
                convertFromRaw(text))} />,
          link: <a>{this.doc.get('link')}</a>,
          title: <h4>{this.doc.get('title')}</h4>,
          image: <PublicContentShowImage
            form={this}
            imageId={this.doc.get('image')} />,
          question: <StudentTestAttemptPageContentQuestionView
            score={this.doc.get('score')}
            form={this}
            questionId={this.doc.get('question')}
            scored={scored}
            question={_.find(questions, { _id: this.doc.get('question') })}
            {...this.props} />,
        }, this.doc.get('type'))}

      </div>
    );
  },

});

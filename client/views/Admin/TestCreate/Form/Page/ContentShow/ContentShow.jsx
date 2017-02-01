// Libs
import React from 'react';
import { CardTitle, CardText, FlatButton } from 'material-ui';
import { Editor, EditorState, convertFromRaw } from 'draft-js';

// Views
import AdminTestCreateFormPageCreateContentShowQuestion from './QuestionContainer.jsx';

const AdminTestCreateFormPageCreateContentShow = React.createClass({
  mixins: [AstroForm(Tests.PageContentSchema)],

  // Handlers

  handleRemove() {
    const { index, form, form: { doc: { content } } } = this.props;
    const type = this.doc.get('type');
    _.pullAt(content, index);
    form.defaultHandler({ content }, { doc: true });
    if (type == 'question') this.props.updateQuestionsSelected();
  },

  // Render

  render() {
    const { index, scored } = this.props;

    return (
      <div>

        {_.get({
          text: <CardText><Editor
              readOnly={true}
              editorState={EditorState.createWithContent(
                convertFromRaw(this.doc.get('text')))} />
            </CardText>,
          link: <CardText><a>{this.doc.get('link')}</a></CardText>,
          title: <CardTitle title={this.doc.get('title')} />,
          question: <AdminTestCreateFormPageCreateContentShowQuestion
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

      </div>
    );
  },

});

export default AdminTestCreateFormPageCreateContentShow;

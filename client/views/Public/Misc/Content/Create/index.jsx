import React from 'react';
import { FlatButton, SelectField, MenuItem, TextField, Paper } from 'material-ui';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';

import PublicContentCreateQuestion from './Question.jsx';
import PublicContentCreateTest from './Test/Container.jsx';
import PublicContentCreateUpload from './Upload.jsx';
import PublicContentCreateVideo from './Video.jsx';
import PublicContentRichText from './../RichText.jsx';
import PublicContentCreateSudoku from './Sudoku.jsx';

PublicContentCreate = React.createClass({
  mixins: [AstroForm()],

  // Lifecycle

  getInitialState() {
    return { editorState: EditorState.createEmpty() };
  },

  componentWillMount() {
    this.defaultHandler({ [this.doc.get('type')]: '' }, { doc: true });
  },

  // Handlers

  handleSubmit() {
    if (this.props.handleSubmit) {
      this.props.handleSubmit();
      return;
    }

    const { type } = this.doc;
    const { form, schema, field, updateQuestionsSelected } = this.props;
    form.defaultHandler({ [field]: _.clone(this.doc) }, { doc: true, operation: 'push' });
    snack('Bloco criado!');
    this.doc = new this.props.schema({ type, [type]: '' });
    if (type == 'question') updateQuestionsSelected && updateQuestionsSelected();
    this.setState({ editorState: EditorState.createEmpty() });
    this.updateValidation();
  },

  handleEditorChange(editorState) {
    this.setState({ editorState });
    const text = convertToRaw(editorState.getCurrentContent());
    this.defaultHandler({ text }, { doc: true });
  },

  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.handleEditorChange(newState);
      return 'handled';
    };

    return 'not-handled';
  },

  handleTextChange({ currentTarget }, value) {
    const name = currentTarget.getAttribute('name');
    this.defaultHandler({ [name]: value }, { doc: true });
  },

  handleTypeChange(event, index, type) {
    this.defaultHandler({ type, [type]: '', [this.doc.get('type')]: null },
      { doc: true });
  },

  handleSudoku(sudoku) {
    console.log('handleSudoku', this);
    if (sudoku) {
      this.props.form.defaultHandler({ sudoku: sudoku }, { doc: true });
      this.defaultHandler({ sudoku: sudoku }, { doc: true });
      this.handleSubmit();
    }

    //this.props.form.defaultHandler({ sudoku: sudoku }, { doc: true });
  },

  // Render

  render() {
    const { type, text, link, title } = this.doc;
    const { errors, valid, editorState } = this.state;
    return (
      <div>
        <div className='row'>
          <SelectField value={type} onChange={this.handleTypeChange} >
            {_.map(this.props.contentTypes.all('both'), (v, k) =>
              <MenuItem key={k} value={k} primaryText={v} />)}
          </SelectField>
        </div>
        <div className='row'>
          {
            _.get({
              text:
                <Paper zDepth={1}>
                  <PublicContentRichText
                    parent={this}
                    editorState={editorState}
                  />
                </Paper>,
              image:
                <PublicContentCreateUpload
                  form={this}
                />,
              link:
                <TextField
                  name='link'
                  value={link}
                  floatingLabelText='Link'
                  onChange={this.handleTextChange}
                  errorText={_.get(errors, 'link')}
                />,
              question:
                <PublicContentCreateQuestion
                  form={this}
                  scored={this.props.scored}
                  questionsSelected={this.props.questionsSelected || []}
                  disableCreateQuestion={this.props.disableCreateQuestion}
                  subjects={this.props.subjects}
                />,
              test:
                <PublicContentCreateTest
                  form={this}
                  course={this.props.course}
                />,
              video:
                <PublicContentCreateVideo
                  form={this}
                />,
              sudoku:
                <PublicContentCreateSudoku
                  handleSudoku={this.handleSudoku}
                  form={this}
                />,
            },
            type)
          }
        </div>

        {
          type === 'image' || type === 'video' || type === 'sudoku'
          ? undefined
          : <FlatButton
            style={{ marginTop: 15 }}
            onTouchTap={this.handleSubmit}
            disabled={!valid}
            primary={true}
            label='Adicionar'
          />
        }

      </div>
    );
  },

});

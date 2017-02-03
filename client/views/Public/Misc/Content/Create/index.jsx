import React from 'react';
import { FlatButton, SelectField, MenuItem, TextField, Paper } from 'material-ui';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';

import PublicContentCreateQuestion from './Question.jsx';

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
    const { type } = this.doc;
    const { form, schema, field, updateQuestionsSelected } = this.props;
    const array = form.doc.get(field) || [];
    array.push(_.clone(this.doc));
    form.defaultHandler({ [field]: array }, { doc: true });
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

  // Render

  render() {
    const { type, text, link, title } = this.doc;
    const { errors, valid } = this.state;
    return (
      <div>
        <div className='row'>
          <SelectField value={type} onChange={this.handleTypeChange} >
            {_.map(this.props.contentTypes.all('both'), (v, k) =>
              <MenuItem key={k} value={k} primaryText={v} />)}
          </SelectField>
        </div>
        <div className='row'>
          {_.get({
            text: <Paper zDepth={1}>
              <TextField
                children={<Editor
                  handleKeyCommand={this.handleKeyCommand}
                  editorState={this.state.editorState}
                  onChange={this.handleEditorChange} />}
                name='text'
                hintText={!this.doc.get('text') && 'Texto'}
                style={{ marginLeft: 20 }}
                errorStyle={{ marginTop: 15 }}
                underlineShow={false}
                fullWidth={true}
                errorText={_.get(errors, 'text')}
                multiLine={true} />
              </Paper>,
            title: <TextField
                name='title'
                value={title}
                floatingLabelText='Título'
                onChange={this.handleTextChange}
                errorText={_.get(errors, 'title')} />,
            link: <TextField
                name='link'
                value={link}
                floatingLabelText='Link'
                onChange={this.handleTextChange}
                errorText={_.get(errors, 'link')} />,
            question: <PublicContentCreateQuestion
                form={this}
                scored={this.props.scored}
                questionsSelected={this.props.questionsSelected}
                subjects={this.props.subjects} />,
          }, type)}
        </div>
          <FlatButton
            style={{ marginTop: 15 }}
            onTouchTap={this.props.handleSubmit || this.handleSubmit}
            disabled={!valid}
            primary={true}
            label='Adicionar' />

      </div>
    );
  },

});

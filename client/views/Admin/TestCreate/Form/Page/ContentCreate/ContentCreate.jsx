import React from 'react';
import { CardTitle, FlatButton } from 'material-ui';
import { SelectField, MenuItem, TextField } from 'material-ui';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';

import AdminTestCreateFormPageQuestion from './Question.jsx';

const AdminTestCreateFormPageCreateContentCreate = React.createClass({
  mixins: [AstroForm(Tests.PageContentSchema)],

  // Lifecycle

  getInitialState() {
    return { editorState: EditorState.createEmpty() };
  },

  componentWillMount() {
    this.defaultHandler({ [this.doc.get('type')]: '' }, { doc: true });
  },

  // Handlers

  handleEditorChange(editorState) {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    this.defaultHandler({ text: rawContentState }, { doc: true });
    this.setState({ editorState });
  },

  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.handleEditorChange(newState);
      return 'handled';
    };

    return 'not-handled';
  },

  handleSubmit() {
    const { type } = this.doc;
    this.props.form.defaultHandler({ content: _.clone(this.doc) },
      { doc: true, operation: 'push' });
    snack('Bloco criado!');
    this.doc = new Tests.PageContentSchema({ type, [type]: '' });
    if (type == 'question') this.props.updateQuestionsSelected();
    this.setState({ editorState: EditorState.createEmpty() });
    this.updateValidation();
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

    console.log(text);

    return (
      <div className='ui basic segment' style={{ width: '100%' }}>
        <CardTitle title='Novo conteúdo' />

          <div className='row'>
            <SelectField value={type} onChange={this.handleTypeChange} >
              {_.map(ContentTypes.all('both'), (v, k) =>
                <MenuItem key={k} value={k} primaryText={v} />)}
            </SelectField>
          </div>

          <div className='row'>
            {_.get({
              text: <TextField
                  children={<Editor
                    handleKeyCommand={this.handleKeyCommand}
                    editorState={this.state.editorState}
                    onChange={this.handleEditorChange} />}
                  name='text'
                  underlineShow={false}
                  fullWidth={true}
                  errorText={_.get(errors, 'text')}
                  multiLine={true} />,
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
              question: <AdminTestCreateFormPageQuestion
                  form={this}
                  scored={this.props.scored}
                  questionsSelected={this.props.questionsSelected}
                  subjects={this.props.subjects} />,
            }, type)}
          </div>

          <div className='row'>
            {type == 'question' ? undefined :
              <FlatButton
                onTouchTap={this.handleSubmit}
                disabled={!valid}
                secondary={true}
                label='Adicionar conteúdo' />}
          </div>

      </div>
    );
  },

});

export default AdminTestCreateFormPageCreateContentCreate;

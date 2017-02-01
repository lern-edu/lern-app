import React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui';
import { FlatButton, DropDownMenu, MenuItem, TextField } from 'material-ui';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';

const AdminTestCreateFormBasicContent = React.createClass({
  mixins: [AstroForm(Tests.ContentSchema)],

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
    this.props.form.defaultHandler({ info: _.clone(this.doc) },
      { doc: true, operation: 'push' });
    snack('Bloco criado!');
    this.doc = new Tests.ContentSchema();
    this.setState({ editorState: EditorState.createEmpty() });
    this.updateValidation();
  },

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
      <Card>
        <CardHeader title='Novo conteúdo' />

        <CardText>
          <div className='row'>
            <DropDownMenu value={type} onChange={this.handleTypeChange} >
              {_.map(ContentTypes.all('both'), (v, k) =>
                <MenuItem key={k} value={k} primaryText={v} />)}
            </DropDownMenu>
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
            }, type)}
          </div>
        </CardText>

        <CardActions>
          <FlatButton
            onTouchTap={this.handleSubmit}
            disabled={!valid}
            secondary={true}
            label='Adicionar' />
        </CardActions>

      </Card>
    );
  },

});

export default AdminTestCreateFormBasicContent;

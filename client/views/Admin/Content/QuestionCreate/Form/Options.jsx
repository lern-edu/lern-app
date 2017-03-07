import React from 'react';
import { Paper, Divider, SelectField, MenuItem, FlatButton, Dialog } from 'material-ui';
import { Table, TableHeaderColumn, TableRow, TableHeader } from 'material-ui';
import { TableRowColumn, TableBody, TextField } from 'material-ui';

const AdminQuestionCreateFormOptions = React.createClass({

  // Static data

  instructions: {
    image: 'Selecione uma imagem no formato jpg',
    text: 'Pressione enter para salvar a alternativa',
    type: 'Selecione um tipo de alternativa',
  },

  // Initial state

  componentDidMount() {
    const { options } = this.props.form.doc;
    this.props.form.defaultHandler({ options: options ? options : [] },
      { doc: true });
  },

  getInitialState() {
    return { type: 'text',
      text: '',
      open: false,
      file: null,
      message: '',
      title: '', };
  },

  // Trigger

  triggerSelectFolder(evt) {
    ReactDOM.findDOMNode(this.refs.file).click();
  },

  // Handlers

  handleTypeChange(event, index, type) {
    this.setState({ type });
  },

  handleOptionText(proxy, event) {
    if (proxy.keyCode == 13 || proxy.which == 13) {
      const { options } = this.props.form.doc;
      const { text } = this.state;
      if (text) options.push({ text: text.trim() });
      this.props.form.defaultHandler({ options }, { doc: true });
      this.setState({ text: '' });
    };
  },

  handleText(event, text) {
    this.setState({ text });
  },

  handleAnswer(answer) {
    this.props.form.defaultHandler({ answer }, { doc: true });
  },

  handleOptionRemove() {
    const { options, answer } = this.props.form.doc;
    _.pullAt(options, answer);
    this.props.form.defaultHandler({ options, answer: null }, { doc: true });
  },

  handleOptionDialog(message='', title='', file=null) {
    // Toggle dialog
    const { open } = this.state;
    this.setState({ open: !open, file, message, title });
  },

  handleFilePath(event) {
    const { value, files } = event.target;
    const file = _.first(files);
    if (file.type === 'image/jpeg')
      this.handleOptionDialog('Pressione ok para carregar imagem', 'Imagem', file);
    else
      this.handleOptionDialog('A imagem não é suportada', 'Desculpe');
  },

  handleOptionImage() {
    const { file } = this.state;
    if (file)
      FS.Images.insert(file, (err, fileObj) => {
        if (!err) {
          const options = this.props.form.doc.get('options');
          options.push({ image: fileObj._id });
          this.props.form.defaultHandler({ options }, { doc: true });
          const images = Session.get('images') || [];
          images.push(fileObj._id);
          Session.set('images', images);
          this.handleOptionDialog();
        };
      });
    else
      this.handleOptionDialog();
  },

  // render
  render() {
    const { answer, options } = this.props.form.doc;
    const { images } = this.props;
    const { instructions } = this;
    const { type, text, open, message, title } = this.state;

    return (
      <div className='ten wide column'>
        <SelectField
          value={type}
          onChange={this.handleTypeChange}
          name={instructions.type}
          fullWidth={true}
          floatingLabelText='Tipo de alternativa'>
          {[<MenuItem
            key='image'
            value='image'
            primaryText='Imagem'/>,
          <MenuItem
            key='text'
            value='text'
            primaryText='Texto'/>,
          ]}
        </SelectField>
        {type === 'text' ? (
          <TextField
            value={text}
            onChange={this.handleText}
            hintText='Texto'
            name={instructions.text}
            floatingLabelText='Texto'
            onKeyDown={this.handleOptionText}
            multiLine={true}
            fullWidth={true}
            rows={1} />
        ) : <TextField
            value={text}
            hintText='Imagem'
            onClick={this.triggerSelectFolder}
            name={instructions.image}
            floatingLabelText='Imagem'
            fullWidth={true}
            rows={1} />}
        <Paper zDepth={1} style={{ marginTop: '10px' }}>
          <Table onCellClick={this.handleAnswer}>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>Tipo</TableHeaderColumn>
                <TableHeaderColumn>Conteúdo</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody deselectOnClickaway={false} >
              {_.map(options, (op, index) => {
                const text = op.text ? op.text : _.get(_.first(_.filter(images,
                  img => img._id === op.image)), 'original.name');
                return (
                  <TableRow
                    key={text}
                    selected={index === answer}>
                    <TableRowColumn>
                      {op.text ? 'Texto' : 'Imagem'}
                    </TableRowColumn>
                    <TableRowColumn>
                      {text}
                    </TableRowColumn>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <div className='ui right aligned grid'
            style={{ marginTop: '1rem' }}>
            <div className='sixteen wide column'
              style={{ paddingBottom: 0, margin: '0.25rem' }}>
              <FlatButton
                label='Remover'
                disabled={(options && options.length) ? false : true}
                secondary={true}
                onTouchTap={this.handleOptionRemove} />
            </div>
          </div>
        </Paper>
        <Dialog
          title={title}
          actions={[<FlatButton
            label='Ok' primary={true}
            onTouchTap={this.handleOptionImage}/>,
          ]}
          modal={false}
          open={open}
          onRequestClose={this.handleOptionDialog} >
          {message}
        </Dialog>
        <input
          style={{ display: 'none' }}
          type='file'
          ref='file'
          onChange={this.handleFilePath} />
      </div>
    );
  },
});

export default AdminQuestionCreateFormOptions;

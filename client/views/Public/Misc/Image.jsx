import React from 'react';
import { Card, CardActions, CardHeader, FlatButton, CardText, CardMedia, TextField, Dialog, CardTitle, } from 'material-ui';

PublicUploadImage = React.createClass({
  // Static data

  instructions: {
    image: 'Selecione uma imagem no formato jpg',
    extension: 'A imagem não é suportada',
  },

  // Initial state

  getInitialState() {
    const { image: { _id, original: { name }={} }={} } = this.props;
    return { open: false,
      upload: false,
      remove: _id ? true : false,
      file: null,
      fileName: name, };
  },

  // Trigger

  triggerSelectFolder(evt) {
    if (!this.props.image)
      ReactDOM.findDOMNode(this.refs.file).click();
  },

  /* Handlers
  */

  handleFilePath(event) {
    const { value, files } = event.target;
    const file = _.first(files);
    if (file.type === 'image/jpeg')
      this.setState({ upload: true, file, fileName: file.name });
    else
      this.setState({ open: true });
  },

  handleClose() {
    this.setState({ open: false });
  },

  handleUpload() {
    const { state: { file }, props: { form, field, clear } } = this;
    let { form: { doc: { [_.sample(field)]: toSave=[] } } } = this.props;
    FS.Images.insert(file, (err, fileObj) => {
      if (err) this.setState({ file: null, open: true, upload: false });
      else {
        _.includes(_.keys(field), 'array') ?
          (toSave ? toSave.push(fileObj._id) : toSave = [fileObj._id]) : toSave = fileObj._id;
        form.defaultHandler({ [_.sample(field)]: toSave }, { doc: true });
        const docs = Session.get(_.sample(field)) || [];
        docs.push(fileObj._id);
        Session.set(_.sample(field), docs);
        if (clear) this.setState({ file: null, fileName: null, remove: false, upload: false });
        else this.setState({ upload: false, remove: true });
      };
    });
  },

  handleRemove() {
    const { image: { _id }, field, form } = this.props;
    let { form: { doc: { [_.sample(field)]: toSave } } } = this.props;
    _.includes(_.keys(field), 'array') ? _.pull(toSave, _id) : toSave = null;
    form.defaultHandler({ [_.sample(field)]: toSave }, { doc: true });
    this.setState({ upload: false, remove: false, file: null, fileName: null });
    const docs = Session.get(_.sample(field)) || [];
    _.pull(docs, _id);
    Session.set(_.sample(field), docs);
  },

  // Render

  render() {
    const { image } = this.props;
    const { instructions } = this;
    const { open, upload, remove, fileName } = this.state;

    return (
      <Card>
        <CardHeader
          title='Imagem'
          actAsExpander={true}
          showExpandableButton={true}
          subtitle={image ? image.original.name : 'Nenhuma imagem selecionada'} />
          {image ? (
            <CardMedia
              overlay={<CardTitle
              title={image.original.name}
              subtitle={`${image.original.size / 1000000}Mb`} />}
              expandable={true}>
              <img src={image.url()} />
            </CardMedia>
          ) : undefined}
        <CardText expandable={true}>
          <TextField
            hintText='Selecione um imagem'
            disabled={remove}
            value={fileName ? fileName : ''}
            name={instructions.image}
            fullWidth={true}
            onClick={this.triggerSelectFolder}
            rows={1} />
          <input
            style={{ display: 'none' }}
            type='file'
            ref='file'
            onChange={this.handleFilePath} />
        </CardText>
        <CardActions expandable={true}>
          <FlatButton
            label='Upload'
            primary={true}
            disabled={!upload}
            onTouchTap={this.handleUpload} />
          <FlatButton
            label='Remover'
            secondary={true}
            disabled={!remove}
            onTouchTap={this.handleRemove} />
        </CardActions>
        <Dialog
          title='Desculpe!'
          actions={[<FlatButton
            label='Ok' primary={true}
            onTouchTap={this.handleClose}/>,
          ]}
          modal={false}
          open={open}
          onRequestClose={this.handleClose} >
          {instructions.extension}
        </Dialog>
      </Card>
    );
  },

});

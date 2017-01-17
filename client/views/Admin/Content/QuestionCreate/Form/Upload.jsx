import React from 'react';
import { CardMedia, TextField, Dialog, CardTitle } from 'material-ui';
import { Card, CardActions, CardHeader, FlatButton, CardText } from 'material-ui';

AdminQuestionCreateFormUpload = React.createClass({
  // Static data

  instructions: {
    image: 'Selecione uma imagem no formato jpg',
    extension: 'A imagem não é suportada',
  },

  // Initial state

  getInitialState() {
    const { image } = this.props;
    return { open: false,
      upload: false,
      remove: image ? true : false,
      file: null,
      fileName: null, };
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
    const { file } = this.state;
    FS.Images.insert(file, (err, fileObj) => {
      if (err) this.setState({ file: null, open: true, upload: false });
      else {
        this.props.form.defaultHandler({ image: fileObj._id }, { doc: true });
        this.setState({ upload: false, remove: true });
        const images = Session.get('images') || [];
        images.push(fileObj._id);
        Session.set('images', images);
      };
    });
  },

  handleRemove() {
    const { image } = this.props;
    this.props.form.defaultHandler({ image: null }, { doc: true });
    this.setState({ upload: false,
      remove: false,
      file: null,
      fileName: null, });
    const images = Session.get('images') || [];
    _.pull(images, image._id);
    Session.set('images', images);
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

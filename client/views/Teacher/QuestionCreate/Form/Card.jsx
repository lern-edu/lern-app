import React from 'react';

TeacherQuestionCreateFormCard = React.createClass({

  //  Initial state

  getInitialState() {
    return {
      name: undefined,
      file: undefined,
      status: undefined,
      fileId: undefined,
      instruction: `Selecione um arquivo no formato ${_.last(this.props.type.split('/'))}`,
    };
  },

  // Trigger

  triggerHiddenInput() {
    ReactDOM.findDOMNode(this.refs.file).click();
  },

  // Handles

  handleFileType({ target: { files } }) {
    const file = _.first(files);
    this.setState({ name: _.get(file, 'name'), file });
  },

  handleFilePath({ target: { files } }) {
    const file = _.first(files);
    if (file.type === this.props.type)
    this.setState({
      file,
      name: _.get(file, 'name'),
      status: undefined,
    });
    else {
      this.setState({
        name: undefined,
        file: undefined,
        status: undefined,
        fileId: undefined,
        instruction: `Selecione um arquivo no formato ${_.last(this.props.type.split('/'))}`, });
      $(ReactDOM.findDOMNode(this.refs.instruction)).transition('shake');
    }
  },

  handleUploadFile() {
    let { file, status, fileId } = this.state;
    const { type, form } = this.props;
    const fs = type === 'image/jpeg' ? { collection: FS.Images, field: 'image' } :
      type === 'audio/mpeg' ? { collection: FS.Audios, field: 'audio' } : undefined;

    fs.collection.insert(file, (err, fileObj) => {
      if (err) state.status = 'fail';
      else {
        status = 'success';
        fileId = fileObj._id;
        form.defaultHandler({ [fs.field]: fileObj._id }, { doc: true });
      };

      this.setState({ file, status, fileId });
    });
  },

  removeFile() {
    const { type, form } = this.props;
    const field = type === 'image/jpeg' ? 'image' :
      type === 'audio/mpeg' ? 'audio' : undefined;
    form.defaultHandler({ [field]: null }, { doc: true });
    this.setState({
      name: undefined,
      file: undefined,
      status: undefined,
      fileId: undefined,
      instruction: `Selecione um arquivo no formato ${_.last(this.props.type.split('/'))}`,
    });
  },

  // Render

  render() {
    const { name, file, status, fileId, instruction } = this.state;
    const { type } = this.props;
    const width = (status === 'success' ? '100%' : (status === 'fail' ? '5%' : '50%'));
    return (
      <div className='wide field'>
        <div className='ui centered card'>
        <div className='image'>
          <i className='massive icons'>
            <i className={`${type === 'image/jpeg' ? 'picture' :
              type === 'audio/mpeg' ? 'sound' : undefined} icon`}></i>
            <i className={`inverted corner ${status === 'success' ?
              'checkmark green' : 'remove red'} icon`}></i>
          </i>
        </div>
          <div className='content'>
            <div className='ui transparent action input'>
              <input
                placeholder='Selecione um arquivo'
                type='text'
                onClick={this.triggerHiddenInput}
                value={name ? name : null}/>
              <button className='ui basic icon button' onClick={this.triggerHiddenInput}>
                <i className='folder icon'></i>
              </button>
            </div>
            <input
              style={{ display: 'none' }}
              type='file'
              ref='file'
              onChange={this.handleFilePath} />
          </div>
          <div className='extra content'>
            <button className={`ui right labeled icon primary button ${
                !file && status != 'success' ? 'disabled' : 'primary'}`}
              onClick={this.handleUploadFile}>
              <i className='cloud upload icon'></i>
              Upload
            </button>
            <button className={`ui icon red button ${!fileId ? 'disabled' : null}`}
              onClick={this.removeFile}>
              <i className='remove icon'></i>
            </button>
          </div>
          <div className={`ui bottom attached progress ${status === 'success'
            ? 'success' : (status === 'fail' ? 'red' : null)}`}>
          <div className='bar' style={{ width, transitionDuration: '300ms' }}></div>
          </div>
        </div>
        {!instruction ? undefined :
          <div ref='instruction' className='ui pointing basic label'>{instruction}</div>}
      </div>
    );
  },
});

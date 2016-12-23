import React from 'react';

TeacherQuestionCreateFormAnswer = React.createClass({

  // Static data

  instructions: {
    open: 'A respota precisa conter ao menos 4 caracteres',
    closed: 'Necessário criar ao menos duas alternativas e selecionar uma resposta',
  },

  /* Lifecycle
  */

  getInitialState() {
    return {
      answer: -1,
      options: [],
      optionsLabel: [],
      value: '',
      optionType: 'text',
      imageFile: undefined,
      imageId: undefined,
      uploadStatus: undefined,
    };
  },

  /* Handlers
  */

  handleInsertClick() {
    const { form } = this.props;
    const { value, options, optionType, imageId, optionsLabel } = this.state;
    if (optionType === 'image')
      options.push(imageId);
    else
      options.push(value);

    optionsLabel.push(value);

    this.setState({
      options,
      optionsLabel,
      value: '',
      imageFile: undefined,
      imageId: undefined,
      uploadStatus: undefined,
    });

    const docOptions = _.map(options, (opt, index) => {
      if (opt != optionsLabel[index])
        return new Questions.OptionSchema({ image: opt });
      else
        return new Questions.OptionSchema({ text: opt });
    });
    form.defaultHandler({ options: docOptions }, { doc: true });
  },

  handleOptionAccept(event) {
    const { form } = this.props;
    const $item = $(event.target).closest('.item');
    const answer = parseInt($item.attr('value'));
    this.setState({ answer });
    form.defaultHandler({ answer }, { doc: true });
  },

  handleOptionClose(event) {
    const { form } = this.props;
    const { options, optionsLabel } = this.state;
    const $item = $(event.target).closest('.item');
    const index = $item.attr('value');
    _.pullAt(options, index);
    _.pullAt(optionsLabel, index);
    this.setState({ options, answer: -1 });
    form.defaultHandler({ answer: null }, { doc: true });

    const docOptions = _.map(options, opt => new Questions.OptionSchema({ text: opt }));
    form.defaultHandler({ options: docOptions }, { doc: true });
  },

  handleInput(value) {
    this.setState({ value });
  },

  handleKeyDown(event) {
    if (event.keyCode == 13 || event.charCode == 13) {
      event.preventDefault();
      ReactDOM.findDOMNode(this.refs.addOption).click();
    }
  },

  handleDropdown(optionType) {
    this.setState({
      optionType,
      imageFile: undefined,
      value: '',
      imageId: undefined,
      uploadStatus: undefined,
    });
  },

  handleUploadTrigger() {
    const { optionType } = this.state;
    if (optionType === 'image')
      ReactDOM.findDOMNode(this.refs.file).click();
  },

  handleImagePath({ target }) {
    const file = _.first(target.files);
    this.setState({ value: _.get(file, 'name'), imageFile: file });
    FS.Images.insert(file, (err, { _id: imageId }) => {
      if (err) this.setState({ uploadStatus: 'fail' });
      else this.setState({ uploadStatus: 'success', imageId });
    });
  },

  /* Render
  */

  render() {
    const { instructions } = this;
    const { options, optionsLabel, value, answer, optionType, imageId, uploadStatus } = this.state;
    const { errors, form } = this.props;
    const { type } = this.props.restore;

    return (
      <div className='ui centered grid'>

        <div className='row'>

          {type === 'open' ? (
            <div className='six wide field'>
              <label>Resposta Modelo</label>
              <Semantic.Input tag='textarea' rows='4' placeholder='Digite a resposta' onInput={form.defaultHandler('answer', { doc: true })} />
              <div className='ui pointing blue basic label'>{instructions.open}</div>
            </div>
          ) : type === 'closed' ? (
            <div className='six wide field'>
              <label>Opções</label>
              <div className='ui selection list'>
                {_.map(optionsLabel, (opt, i) =>
                  <div className='item' key={i} value={i}>
                    <i className='right floated close icon' onClick={this.handleOptionClose}/>
                    <i className={`icon ${answer === i ? 'checkmark box' : 'square outline'}`} onClick={this.handleOptionAccept} />
                    <div className='content' onClick={this.handleOptionAccept}><div className='header'>{opt}</div></div>
                  </div>
                )}
              </div>
              <div className='ui right action left icon input'>
                <i className={`${optionType === 'image' ? (uploadStatus === 'fail' ? 'warning sign red' : (uploadStatus === 'success' ? 'checkmark green' : 'folder')) : 'font'} icon`} />
                <Semantic.Input type='text' placeholder={optionType === 'image' ? 'Selecione uma imagem' : 'Digite o texto da opção'} value={value} onClick={this.handleUploadTrigger} onKeyDown={this.handleKeyDown} onInput={this.handleInput}/>
                <Semantic.Dropdown tag='select' className='ui compact selection dropdown' onChange={this.handleDropdown}>
                  <option defaultValue='' value='text'>Texto</option>
                  <option value='image'>Imagem</option>
                </Semantic.Dropdown>
                <div className={`ui basic icon button ${optionType === 'image' ? (uploadStatus === 'fail' ? 'disabled' : null) : null}`} ref='addOption' onClick={this.handleInsertClick} >
                  <i className='add icon' />
                </div>
                <Semantic.Input style={{ display: 'none' }} type='file' ref='file' onChange={this.handleImagePath} />
              </div>
              <div className='ui pointing blue basic label'>{instructions.closed}</div>
            </div>
          ) : undefined}

        </div>
        <div className='row'>
          <div className={`ui button ${errors.options || errors.answer ? 'disabled' : 'primary'}`} onClick={form.handleNextClick}>
            Próximo passo
          </div>
        </div>

      </div>
    );
  },
});

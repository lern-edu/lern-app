import React from 'react';
import { TextField, AutoComplete, MenuItem } from 'material-ui';
import { RaisedButton, SelectField, CircularProgress } from 'material-ui';

AdminQuestionCreateForm = React.createClass({
  mixins: [AstroForm(Questions.Schema, 'AdminQuestionSave')],

  // Static data

  instructions: {
    subject: 'Selecione 1 matéria ',
    text: 'Redija um enunciado com 4 ou mais letras',
    type: 'Selecione o tipo de questão',
    answer: 'Redija uma resposta com 4 ou mais letras',
  },

  /* Lifecycle
  */

  componentDidMount() {
    this.defaultHandler(this.props.restore, { query: true });
  },

  /* Handlers
  */

  handleTypeChange(event, index, type) {
    this.defaultHandler({ type }, { query: true });
  },

  handleSubjectChange({ value: { key: subject } }) {
    this.defaultHandler({ subject, tags: [] }, { query: true });
  },

  handleSubmitSuccess({ _id }) {
    console.log(`Question created: ${_id}`);
    snack('Bom trabalho!');
    FlowRouter.go('AdminQuestionCreate', {}, this.props.restore);
    location.reload();
  },

  handleText({ target: { value: text } }) {
    this.defaultHandler({ text }, { doc: true });
  },

  handleAnswer({ target: { value: answer } }) {
    this.defaultHandler({ answer }, { doc: true });
  },

  handleSubmitError(error) {
    snack('Algo deu errado!');
  },

  // Render

  render() {
    const { errors, valid } = this.state;
    const { restore, subjects, tags, images, ready } = this.props;
    const { instructions } = this;
    const image = _.get(this, 'doc.image');

    console.log(errors);

    return (
      <div className='ui form'>

        <div className='ui centered grid'>

          <div className='row'>
            <h2>Criar Questão</h2>
          </div>

          <div className='row'>
            <div className='ten wide column'>
              <AutoComplete
                floatingLabelText='Matéria'
                filter={AutoComplete.fuzzyFilter}
                onNewRequest={this.handleSubjectChange}
                searchText={_.get(_.first(
                  _.filter(subjects, s => s._id === restore.subject)), 'name')}
                disableFocusRipple={true}
                dataSource={_.map(subjects, s => _.zipObject(
                  ['text', 'value'],
                  [s.name,
                    <MenuItem
                    primaryText={s.name}
                    secondaryText={SubjectAreas.getName(s.area)}
                    key={s._id} />,
                  ])
                )}
                fullWidth={true}
                name={instructions.subject}
              />
            </div>
          </div>

          {ready.tags ?
            <AdminQuestionCreateFormTags
              tagIds={restore.tags}
              tags={_.filter(tags, t => t.subject === restore.subject)}
              form={this} /> : <CircularProgress />}

          <div className='row'>
            <div className='ten wide column'>
              <TextField
                floatingLabelText='Enunciado'
                hintText='Enunciado'
                multiLine={true}
                rows={4}
                fullWidth={true}
                name={instructions.text}
                onChange={this.handleText}
              />
            </div>
          </div>

          <div className='row'>
            <div className='ten wide column'>
              <AdminQuestionCreateFormUpload
                form={this}
                image={(image && images) ? _.first(_.filter(images,
                  img => img._id === image)) : null} />
            </div>
          </div>

          <div className='row'>
            <div className='ten wide column'>
              <SelectField
                value={restore.type ? restore.type : ''}
                onChange={this.handleTypeChange}
                name={instructions.type}
                fullWidth={true}
                floatingLabelText='Tipo de questão'>
                {_.map(QuestionTypes.getItems(), type =>
                  <MenuItem
                    key={type.value}
                    value={type.value}
                    primaryText={type.header} />)}
              </SelectField>
            </div>
          </div>

          <div className='row'>
            {_.get({
              open: <div className='ten wide column'>
                <TextField
                  floatingLabelText='Resposta'
                  hintText='Resposta'
                  multiLine={true}
                  rows={4}
                  fullWidth={true}
                  name={instructions.answer}
                  onInput={this.handleAnswer} />
                </div>,
              closed: (ready.images === false ? <CircularProgress /> :
                  <AdminQuestionCreateFormOptions form={this} images={images} />),
              number: null,
            }, restore.type)}
          </div>

          <div className='row'>
            <div className='ten wide column'>
              <div className='ui right aligned grid'
                style={{ marginTop: '1rem' }}>
                <div className='sixteen wide column'
                  style={{ paddingBottom: 0, margin: '0.25rem' }}>
                  <RaisedButton
                    label='Terminar'
                    disabled={valid ? false : true}
                    primary={true}
                    onTouchTap={this.defaultSubmit} />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  },

});

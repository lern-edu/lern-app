// Libs
import React from 'react';
import { TextField, AutoComplete, MenuItem } from 'material-ui';
import { RaisedButton, SelectField, CircularProgress } from 'material-ui';

// Views
import AdminQuestionCreateFormTags from './Tags.jsx';
import AdminQuestionCreateFormUpload from './Upload.jsx';
import AdminQuestionCreateFormOptions from './Options.jsx';

const AdminQuestionCreateForm = React.createClass({
  mixins: [AstroForm(Questions.Schema, 'AdminQuestionSave')],

  // Static data

  instructions: {
    subject: 'Selecione 1 matéria ',
    text: 'Redija um enunciado com 4 ou mais letras',
    type: 'Selecione o tipo de questão',
    answer: 'Redija uma resposta com 4 ou mais letras',
  },

  // Lifecycle

  componentWillMount() {
    const { type } = this.props.restore;
    if (type == 'number')
      this.defaultHandler({ range: new Questions.RangeSchema() },
        { doc: true });
  },

  /* Handlers
  */

  handleTypeChange(event, index, type) {
    if (type != 'closed') this.defaultHandler({ options: null }, { doc: true });
    if (type == 'number')
      this.defaultHandler({ range: new Questions.RangeSchema() },
        { doc: true });
    else this.defaultHandler({ range: null }, { doc: true });
    this.defaultHandler({ type }, { doc: true });
  },

  handleSubjectChange({ value: { key: subject } }) {
    this.defaultHandler({ subject, tags: [] }, { doc: true });
  },

  handleSubmitSuccess({ _id }) {
    console.log(`Question created: ${_id}`);
    snack('Bom trabalho!');
    const restore = _.pick(this.doc, ['subject', 'tags', 'type']);
    this.defaultHandler(restore, { query: true });
  },

  handleText({ target: { value: text } }) {
    this.defaultHandler({ text }, { doc: true });
  },

  handleInput({ currentTarget, target: { value } }) {
    const name = currentTarget.getAttribute('name');
    this.defaultHandler({ [name]: value }, { doc: true });
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
    const { subjects, tags, images, ready } = this.props;
    const { instructions } = this;
    const image = _.get(this, 'doc.image');

    return (
      <div className='ui form'>

        <div className='ui centered grid'>

          <div className='row'>
            <div className='ten wide column'>
              <AutoComplete
                floatingLabelText='Matéria'
                errorText={_.get(errors, 'subject')}
                filter={AutoComplete.fuzzyFilter}
                onNewRequest={this.handleSubjectChange}
                searchText={_.get(_.first(
                  _.filter(subjects, s =>
                    s._id === this.doc.get('subject'))), 'name')}
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
              tagIds={this.doc.get('tags')}
              tags={_.filter(tags, t => t.subject === this.doc.get('subject'))}
              form={this} /> : <CircularProgress />}

          <div className='row'>
            <h4>Enunciado</h4>
          </div>

          <div className='row'>
            <p>{_.get(errors, 'content')}</p>
          </div>

          <div className='row'>
              <div className='ten wide column'>
                <PublicContentCreate
                  field='content'
                  schema={Questions.ContentSchema}
                  ContentTypes={ContentTypes}
                  form={this} />
              </div>
          </div>

          <div className='row'>
            {_.map(this.doc.get('content'), (s, i) =>
              <div className='ten wide column' key={i}>
                <PublicContentShow
                  field='content'
                  schema={Questions.ContentSchema}
                  form={this}
                  doc={s} />
              </div>)}
          </div>

          <div className='row'>
            <div className='ten wide column'>
              <SelectField
                value={this.doc.get('type')}
                onChange={this.handleTypeChange}
                errorText={_.get(errors, 'options') || _.get(errors, 'number')}
                name={instructions.type}
                fullWidth={true}
                floatingLabelText='Tipo de questão'>
                {_.map(QuestionTypes.getItems(), ({ value, header }) =>
                  <MenuItem key={value} value={value} primaryText={header} />)}
              </SelectField>
            </div>
          </div>

          <div className='row'>
            {_.get({
              open: <div className='ten wide column'>
                <TextField
                  errorText={_.get(errors, 'answer')}
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
              number: [<div className='ten wide column' key='range.min'>
                <TextField
                  floatingLabelText='Mínimo'
                  hintText='Mínimo'
                  fullWidth={true}
                  name='range.min'
                  onInput={this.handleInput} />
                </div>,
                <div className='ten wide column' key='range.max'>
                  <TextField
                    floatingLabelText='Máximo'
                    hintText='Máximo'
                    fullWidth={true}
                    name='range.max'
                    onInput={this.handleInput} />
                  </div>,
              ],
            }, this.doc.get('type'))}
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

export default AdminQuestionCreateForm;

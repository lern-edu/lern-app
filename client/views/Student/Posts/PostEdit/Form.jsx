import React from 'react';
import { SelectField, MenuItem, TextField, RaisedButton } from 'material-ui';

StudentPostEditForm = React.createClass({
  mixins: [AstroForm(Posts.Schema, 'UserPostSave')],

  componentDidMount() {
    const { post: { course, type }={} } = this.props;
    this.defaultHandler({ course, type }, { query: true, doc: true });
  },

  // Static data

  instructions: {
    text: 'Mínimo de 4 caracteres',
    title: 'Mínimo de 4 caracteres',
    type: 'Selecione um tipo',
  },

  /* Lifecycle
  */

  // Handlers

  handleCourseChange(event, index, course) {
    this.defaultHandler(
      { course:_.isEqual(course, 'none') ? null : course, subjects: [], tags: [], },
      { doc: true, query: true });
  },

  handleTextChange({ target: { value: text } }) {
    this.defaultHandler({ text }, { doc: true });
  },

  handleTitleChange({ target: { value: title } }) {
    this.defaultHandler({ title }, { doc: true });
  },

  handleSubmitSuccess({ _id }) {
    const { course } = this.props;
    console.log(`Post update: ${_id}`);
    snack('Post atualizado');
    FlowRouter.go('StudentPosts');
  },

  /* Render
  */

  render() {
    const { state: { valid, errors }, instructions,
      props: { courses, subjects, tags, images, documents },
      doc: { type, course, title, text }, } = this;
    return (
      <div className='ui basic segment'>

        <div className='ui vertical basic segment'>
          <h2>Editar Post</h2>
        </div>

        <div className='ui vertical basic segment'>
          <h5>Defina as principais informações do Post.</h5>
        </div>

        <div className='ui vertical basic segment'>
          <TextField
            onChange={this.handleTitleChange}
            value={title}
            hintText='Título'
            errorText={errors.title ? instructions.title : undefined}
            floatingLabelText='Título' />
        </div>

        <div className='ui vertical basic segment'>
          <SelectField value={type} onChange={this.handleTypeChange} disabled={true}
            floatingLabelText='Tipo' errorText={errors.type && instructions.type}>
            {_.map(PostTypes.all('both'), (v, k) =>
              <MenuItem key={k} value={k} primaryText={v} />)}
          </SelectField>
        </div>

        <div className='ui vertical basic segment'>
          <SelectField value={course} onChange={this.handleCourseChange}
            floatingLabelText='Curso'>
            {_.map(courses, ({ name, _id }) =>
              <MenuItem key={_id} value={_id} primaryText={name} />)}
            <MenuItem key='none' value='none' primaryText='Nenhum' />
          </SelectField>
        </div>

        <PublicMiscSubjects
          query={true}
          form={this}
          subjects={subjects}
          error={errors.subjects} />

        <PublicMiscTags form={this} tags={tags} error={errors.tags} />

        {_.map(images, i => <PublicUploadImage clear={true}
          key={_.get(i, '_id')} form={this} field={{ array: 'images' }} image={i} />)}

        {_.map(documents, d => <PublicUploadDocument clear={true}
          key={_.get(d, '_id')} form={this} field={{ array: 'documents' }} document={d} />)}

        <div className='ui vertical basic segment'>
          <PublicUploadImage form={this} field={{ array: 'images' }} clear={true} />
        </div>

        <div className='ui vertical basic segment'>
          <PublicUploadDocument form={this} field={{ array: 'documents' }} clear={true} />
        </div>

        <div className='ui vertical basic segment'>
          <TextField
            onChange={this.handleTextChange}
            hintText='Texto'
            value={text}
            errorText={errors.text ? instructions.text : undefined}
            floatingLabelText='Texto'
            multiLine={true}
            rows={4} />
        </div>

        <div className='ui right aligned basic segment'>
          <RaisedButton
            label='Terminar'
            disabled={valid ? false : true}
            primary={true}
            onTouchTap={this.defaultSubmit} />
        </div>

      </div>
    );
  },
});

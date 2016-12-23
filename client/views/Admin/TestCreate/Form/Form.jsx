import React from 'react';
import { TextField, RaisedButton, DatePicker, SelectField, MenuItem, Slider } from 'material-ui';

AdminTestCreateForm = React.createClass({
  mixins: [AstroForm(Tests.Schema, 'AdminTestSave')],

  // Static Data

  instructions: {
    name: 'Defina um nome com 4 ou mais letras',
    info: 'Defina uma informação com 4 ou mais letras',
    startDate: 'Defina uma data de início',
    endDate: 'Defina uma data de Término',
    timeout: 'Defina um cronômetro e um tempo',
    course: 'Defina um curso',
    type: 'Defina um tipo de teste',
  },

  componentDidMount() {
    this.defaultHandler({ timeoutType: 'none' },
      { doc: true });
  },

  // Handlers

  handleFieldChange(event) {
    this.defaultHandler(
      { [event.currentTarget.getAttribute('data-name')]: event.target.value },
      { doc: true });
  },

  handleStartDateChange(event, startDate) {
    this.defaultHandler({ startDate, endDate: null }, { doc: true });
  },

  handleEndDateChange(event, endDate) {
    this.defaultHandler({ endDate }, { doc: true });
  },

  formatDate(date) {
    return moment(date).format('DD/MM/YYYY');
  },

  handleCourseChange(event, index, course) {
    this.defaultHandler({ course }, { doc: true });
  },

  handleTypeChange(event, index, type) {
    this.defaultHandler({ type }, { doc: true });
  },

  handleSubmitSuccess({ _id }) {
    console.log(`Test created: ${_id}`);
    snack('Teste criado');
    FlowRouter.go('AdminTest', _id);
  },

  /* Render
  */

  render() {
    const { valid, errors } = this.state;
    const { subjects, tags, questions, courses,
      images, ready, } = this.props;
    const { instructions } = this;
    const { name, info, startDate, endDate, course, type } = this.doc;

    const endDateMin = _.clone(startDate) || new Date();
    if (startDate)
      endDateMin.setDate(startDate.getDate() + 1);

    return (
      <div className='ui basic segment'>

        <div className='ui vertical basic segment'>
          <h2>Criar Prova</h2>
        </div>

        <div className='ui vertical basic segment'>
          <TextField
            hintText='Nome'
            floatingLabelText='Nome'
            data-name='name'
            value={name}
            errorText={errors.name ? instructions.name : undefined}
            onChange={this.handleFieldChange} />
        </div>

        <div className='ui vertical basic segment'>
          <TextField
            hintText='Informações'
            floatingLabelText='Informações'
            data-name='info'
            multiLine={true}
            rows={4}
            value={info}
            errorText={errors.info ? instructions.info : undefined}
            onChange={this.handleFieldChange} />
        </div>

        <AdminTestCreateFormSubjects
          subjectIds={this.doc.subjects}
          form={this}
          subjects={subjects}
          error={errors.subjects} />

        <AdminTestCreateFormTags
          tagIds={this.doc.tags}
          form={this}
          tags={tags} />

        <div className='ui vertical basic segment'>
          <DatePicker
            hintText='Início'
            floatingLabelText='Início'
            errorText={errors.startDate ? instructions.startDate : null}
            onChange={this.handleStartDateChange}
            formatDate={this.formatDate}
            autoOk={true}
            wordings={{ ok: 'OK', cancel: 'Cancelar' }}
            minDate={new Date()}
          />
        </div>

        <div className='ui vertical basic segment'>
          <DatePicker
            hintText='Término'
            floatingLabelText='Término'
            errorText={errors.endDate ? instructions.endDate : null}
            onChange={this.handleEndDateChange}
            autoOk={true}
            formatDate={this.formatDate}
            disabled={!startDate}
            value={endDate}
            wordings={{ ok: 'OK', cancel: 'Cancelar' }}
            minDate={endDateMin}
          />
        </div>

        <div className='ui vertical basic segment'>
          <SelectField value={course}
            onChange={this.handleCourseChange}
            errorText={errors.course ? instructions.course : null}
            floatingLabelText='Curso'>
            {_.map(courses, c =>
              <MenuItem key={_.get(c, '_id')}
                value={_.get(c, '_id')}
                primaryText={_.get(c, 'name')}/>)}
          </SelectField>
        </div>

        <div className='ui vertical basic segment'>
          <SelectField value={type}
            onChange={this.handleTypeChange}
            errorText={errors.type ? instructions.type : null}
            floatingLabelText='Tipo'>
            {_.map(TestTypes.all('both'), (val, key) =>
              <MenuItem key={key}
                value={key}
                primaryText={val}/>)}
          </SelectField>
        </div>

        <div className='ui vertical basic segment'>
          <AdminTestCreateFormQuestions
            subjects={subjects}
            form={this}
            questions={questions}
            ready={ready.questions}
            tags={tags}
            images={images}
            errors={errors} />
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

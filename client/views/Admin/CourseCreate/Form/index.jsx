import React from 'react';
import { TextField } from 'material-ui';

AdminCourseCreateForm = React.createClass({
  mixins: [AstroForm(Courses.Schema, 'AdminCourseSave')],

  /* Lifecycle
  */

  getInitialState() {
    return { subjects: [] };
  },

  componentDidMount() {
    this.defaultHandler({
      author: FlowRouter.getParam('schoolId'),
    }, { doc: true });
  },

  /* Handlers
  */

  handleSubmitSuccess({ _id }) {
    console.log(`Course created: ${_id}`);
    FlowRouter.go('AdminHome', {}, { active: 'users' });
  },

  handleSubjectsChange(str) {
    const ids = str ? str.split(',') : [];
    this.setState({ subjects: ids });
    this.defaultHandler({ subjects: ids }, { doc: true });
  },

  handleTagsChange(str) {
    const ids = str ? str.split(',') : [];
    this.defaultHandler({ tags: ids }, { doc: true });
  },

  handleTeachersChange(str) {
    const ids = str ? str.split(',') : [];
    this.defaultHandler({ teachers: ids }, { doc: true });
  },

  handleStudentsChange(str) {
    const ids = str ? str.split(',') : [];
    this.defaultHandler({ students: ids }, { doc: true });
  },

  handleNameChange({ target: { value } }) {
    this.createCourseId(value);
    this.defaultHandler({ name: value }, { doc: true });
  },

  createCourseId(value) {
    var year = new Date().getFullYear();
    var name = value.trim().toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
    this.defaultHandler({ alias: name.substr(0, 4) + '' + year }, { doc: true });
  },

  /* Render
  */

  render() {
    const { valid, subjects: selSubjects } = this.state;
    const { ready, students, teachers, subjects, tags } = this.props;

    return (
      <form className='ui centered grid' onSubmit={this.defaultSubmit}>

        <div className='row'>
          <div className='ui input'>
            <Semantic.Input
              type='text'
              placeholder='Nome'
              onChange={this.handleNameChange} />
          </div>
        </div>

        {!ready.subjects ? <div className='ui inline active loader' /> :
          <div className='row'>
            <Semantic.Dropdown classes='multiple selection' onChange={this.handleSubjectsChange}>
              <input type='hidden' name='role' />
              <i className='dropdown icon' />
              <div className='default text'>Matérias</div>
              <div className='menu'>
                {_.map(subjects, subject =>
                  <div className='item'
                    data-value={subject._id}
                    key={subject._id}>{subject.name}</div>
                )}
              </div>
            </Semantic.Dropdown>
          </div>
        }

        {!ready.subjects ? <div className='ui inline active loader' /> :
          <div className='row'>
            <Semantic.Dropdown classes='multiple selection' onChange={this.handleTagsChange}>
              <input type='hidden' name='role' />
              <i className='dropdown icon' />
              <div className='default text'>Tags</div>
              <div className='menu'>
                {_.map(_.filter(tags, tag => _.includes(selSubjects, tag.subject)), tag =>
                  <div className='item' data-value={tag._id} key={tag._id}>{tag.text}</div>
                )}
              </div>
            </Semantic.Dropdown>
          </div>
        }

        {!ready.users ? <div className='ui inline active loader' /> : [
          <div className='row' key='teachers'>
            <Semantic.Dropdown classes='multiple selection'
              onChange={this.handleTeachersChange}>
              <input type='hidden' name='role' />
              <i className='dropdown icon' />
              <div className='default text'>Professores</div>
              <div className='menu'>
                {_.map(teachers, teacher =>
                  <div className='item'
                    data-value={teacher._id}
                    key={teacher._id}>
                    {teacher.getName()}
                  </div>
                )}
              </div>
            </Semantic.Dropdown>
          </div>,
          <div className='row' key='students'>
            <Semantic.Dropdown classes='multiple selection' onChange={this.handleStudentsChange}>
              <input type='hidden' name='role' />
              <i className='dropdown icon' />
              <div className='default text'>Alunos</div>
              <div className='menu'>
                {_.map(students, student =>
                  <div className='item'
                    data-value={student._id}
                    key={student._id}>{student.getName()}</div>
                )}
              </div>
            </Semantic.Dropdown>
          </div>,
        ]}

        <div className='row'>
          <AdminCourseCreateFormDate {...this.props} form={this}/>
        </div>

        <div className='row'>
          <AdminCourseCreateFormSchedule {...this.props} form={this}/>
        </div>

        <div className='row'>
          <div className='ui input'>
            <TextField
              disabled={true}
              value={this.doc.alias}
              floatingLabelText='Código de acesso'
              />
          </div>
        </div>

        <div className='row'>
          <Semantic.Button
            classes={valid ? 'blue' : 'disabled'}
            tag='button'
            type='submit'
          >Salvar</Semantic.Button>
        </div>

      </form>
    );
  },
});

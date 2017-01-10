import React from 'react';

const AdminCourseForm = React.createClass({
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
    console.log(`Course updated: ${_id}`);
    snack('Disciplina atualizada');
    FlowRouter.go('AdminSchools');
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

  /* Render
  */

  render() {
    const { state: { valid, subjects: selSubjects },
      props: { ready, students, teachers, subjects, tags },
      doc: { name, subjects: courseSubjects, tags: courseTags,
        teachers: courseTeachers, students: courseStudents, }, } = this;

    return (
      <form className='ui centered grid' onSubmit={this.defaultSubmit}>

        <div className='row'>
          <div className='ui input'>
            <Semantic.Input
              value={name || ''}
              type='text'
              placeholder='Nome'
              onInput={this.defaultHandler('name', { doc: true })} />
          </div>
        </div>

        {!ready.subjects ? <div className='ui inline active loader' /> :
          <div className='row'>
            <Semantic.Dropdown
              initial={courseSubjects}
              classes='multiple selection disabled'
              onChange={this.handleSubjectsChange}>
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
            <Semantic.Dropdown
              initial={courseTags}
              classes='multiple selection'
              onChange={this.handleTagsChange}>
              <input type='hidden' name='role' />
              <i className='dropdown icon' />
              <div className='default text'>Tags</div>
              <div className='menu'>
                {_.map(_.filter(tags, tag => _.includes(courseSubjects, tag.subject)), tag =>
                  <div className='item' data-value={tag._id} key={tag._id}>{tag.text}</div>
                )}
              </div>
            </Semantic.Dropdown>
          </div>
        }

        {!ready.users ? <div className='ui inline active loader' /> : [
          <div className='row' key='teachers'>
            <Semantic.Dropdown
              initial={courseTeachers}
              classes='multiple selection'
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
            <Semantic.Dropdown
              initial={courseStudents}
              classes='multiple selection'
              onChange={this.handleStudentsChange}>
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

        {/*{<div className='row'>
          <AdminCourseFormDate {...this.props} form={this}/>
        </div>}*/}

        {/*<div className='row'>
          <AdminCourseFormSchedule {...this.props} form={this}/>
        </div>*/}

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

export default AdminCourseForm;

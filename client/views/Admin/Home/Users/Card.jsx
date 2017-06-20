import React from 'react';

export default class AdminHomeUsersCard extends React.Component {

  /* Render
  */

  render() {
    const { school, users, courses } = this.props;

    const students = _.filter(
      users,
      user =>
        _.includes(user.getRoles(), 'student') && _.get(user, 'profile.school') === school._id
      )
    ;
    const teachers = _.filter(
      users,
      user =>
        _.includes(user.getRoles(), 'teacher') && _.get(user, 'profile.school') === school._id
      )
    ;
    const _courses = _.filter(courses, { author: school._id });

    return (
      <div className='ui card'>
        <div className='content'>
          <div className='content'>{school.getName() || 'sem nome'}</div>
          <div className='meta'>{school.getEmail() || 'sem email'}</div>
        </div>
        <div className='extra content'>
          <div className='ui vertical bulleted text list'>
            <div className='header'>Professores</div>
            {_.map(teachers, teacher =>
              <div className='item' key={teacher._id}>
                {teacher.getName()}
              </div>
            )}
          </div>
        </div>
        <div className='extra content'>
          <div className='ui vertical bulleted text list'>
            <div className='header'>Alunos</div>
            {_.map(students, student =>
              <div className='item' key={student._id}>
                {student.getName()}
              </div>
            )}
          </div>
        </div>
        <div className='extra content'>
          <div className='ui vertical bulleted text list'>
            <div className='header'>Disciplinas</div>
            {_.map(_courses, course =>
              <div className='item' key={course._id}>
                {course.name}
              </div>
            )}
          </div>
        </div>
        <div className='extra content'>
          <div className='ui two buttons'>
            <Semantic.Button
              tag='a'
              href={FlowRouter.path('AdminCourseCreate', { schoolId: school._id })}
            >
              Novo Curso
            </Semantic.Button>
          </div>
        </div>
      </div>
    );
  }

};

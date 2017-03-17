import React from 'react';
import { FlatButton } from 'material-ui';

StudentCourseShowHomeCard = React.createClass({

  /* Render
  */

  render() {
    const { course, teachers, subjects, tags } = this.props;

    return (
      <div className='ui card'>
        <div className='content'>
          <div className='header'>{course.name}</div>
          <div className='meta'>{course.students.length} alunos</div>
        </div>
        <div className='extra content'>
          <div className='ui list'>
            {_.map(course.teachers, t =>
              <div className='item' key={t}>
                {_.get(_.find(teachers, { _id: t }), 'profile.name')}
              </div>
            )}
          </div>
        </div>
        <div className='extra content'>
          <div className='ui list'>
            {_.map(course.subjects, t =>
              <div className='item' key={t}>
                {_.get(_.find(subjects, { _id: t }), 'name')}
              </div>
            )}
          </div>
        </div>
        <div className='extra content'>
          <div className='ui list'>
            {_.map(course.tags, t =>
              <div className='item' key={t}>
                {_.get(_.find(tags, { _id: t }), 'text')}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
});

export default StudentCourseShowHomeCard;

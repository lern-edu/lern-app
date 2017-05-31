import React from 'react';

TeacherLectureEditAttendanceFormStudent = React.createClass({
  mixins: [Semantic.Transition('scale')],

  /* Render
  */

  render() {
    const { student, active, onClick } = this.props;

    return (
      <Semantic.Button className='item' ref='animate' onClick={onClick} userId={student._id}>
        <div className='right floated'>{active ? 'Ausente!' : 'Presente!'}</div>
        <i className={`icon square ${active ? 'red minus' : 'check'}`} />
        <div className='content'>
          <div className='header'>{student.getName()}</div>
        </div>
      </Semantic.Button>
    );
  },
});

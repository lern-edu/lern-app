import React from 'react';

export default class TeacherCourseShowReportsInput extends React.Component{
  render() {
    const { course, tags, subjects, questions, onSelect } = this.props;

    const courseTags = _.map(course.tags, t => _.find(tags, { _id: t }));
    const _courseTags = _.filter(courseTags, tag => {
      const qs = _.filter(questions, q => _.includes(q.tags, tag._id));
      return !_.isEmpty(qs);
    });

    return (
      <div className='ui vertical basic center aligned segment'>
        <Semantic.Dropdown classes='basic blue floating labeled icon button' onChange={onSelect}>
          Selecione Tema
          <i className='tags icon' />
          <div className='menu'>
            {_.map(_courseTags, tag =>
              <div className='item' key={tag._id} data-value={tag._id}>
                <span className='description'>{_.get(_.find(subjects, { _id: tag.subject }), 'name')}</span>
                <span className='text'>{tag.text}</span>
              </div>
            )}
          </div>
        </Semantic.Dropdown>
      </div>
    );
  }
};

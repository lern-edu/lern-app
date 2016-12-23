import React from 'react';

TeacherCourseShowDiary = React.createClass({
  mixins: [Semantic.Transition('scale')],

  /* Lifecycle
  */

  getInitialState() {
    const now = moment();
    return { year: now.year(), month: now.month() };
  },

  /* Handlers
  */

  handlePageChange({ offset }) {
    const { year, month } = this.state;
    const next = moment({ year, month }).add(offset, 'month');
    this.setState({ year: next.year(), month: next.month() });
  },

  /* Render
  */

  render() {
    const { year, month } = this.state;

    return (
      <div className='ui basic segment' ref='animate'>
        <TeacherCourseShowDiaryMenu parent={this} />
        <Semantic.Transitions component='div' className='ui basic vertical segment'>
          <TeacherCourseShowDiaryTable parent={this} {...this.props} key={`${month}-${year}`}/>
        </Semantic.Transitions>
      </div>
    );
  },
});

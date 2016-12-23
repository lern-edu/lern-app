import React from 'react';

TeacherCourseShowLectures = React.createClass({
  mixins: [Semantic.Transition('scale')],

  /* Render
  */

  render() {
    const { lectures, styles: { cardsGrid } } = this.props;

    return (
      <div ref='animate'>
        <Semantic.Transitions {...cardsGrid}>
          {_.map(_.sortBy(lectures, 'startDate'), lecture =>
            <TeacherCourseShowLecturesCard lecture={lecture} {...this.props} key={lecture._id} />
          )}
        </Semantic.Transitions>
      </div>
    );
  },
});

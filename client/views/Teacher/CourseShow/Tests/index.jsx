import React from 'react';
import TeacherCourseShowTestsCard from './Card.jsx';

const TeacherCourseShowTests = React.createClass({
  mixins: [Semantic.Transition('scale')],

  /* Render
  */

  render() {
    const { tests, styles: { cardsGrid } } = this.props;
    const sorted = _.sortBy(tests, test => _.sum(test.scores)).reverse();

    return (
      <div ref='animate'>
        <Semantic.Transitions {...cardsGrid}>
          {_.map(sorted, test =>
            <TeacherCourseShowTestsCard test={test} {...this.props} key={test._id} />
          )}
        </Semantic.Transitions>
      </div>
    );
  },
});

export default TeacherCourseShowTests;

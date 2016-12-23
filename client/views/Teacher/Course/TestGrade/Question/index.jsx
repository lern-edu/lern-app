import React from 'react';

TeacherTestGradeQuestion = React.createClass({
  mixins: [Semantic.Transition('fly right')],

  /* Handlers
  */

  handleQuestionGrade(str) {
    const { answer } = this.props;
    let grade = parseFloat(str) / 100;
    if (_.isNaN(grade)) grade = null;
    if (_.isNull(grade) || (_.isNumber(grade) && grade >= 0 && grade <= 1)) {
      Meteor.call('TeacherAnswerGrade', answer._id, grade, err => {
        if (err) console.log(err);
      });
    } else console.log('invalid-grade');
  },

  /* Render
  */

  render() {
    const { test, question, answer } = this.props;

    const state = !answer ? 'nope' : answer.grade ? 'yep' : 'meh';

    return (
      <div className='ui segment' ref='animate'>

        <TeacherTestGradeQuestionHeader {...this.props} />
        <TeacherTestGradeQuestionAnswer {...this.props} />
        <TeacherTestGradeQuestionGrade {...this.props} />

      </div>
    );
  },
});

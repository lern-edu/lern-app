import React from 'react';

const TeacherAttemptGradeMenuQuestionAnswer = React.createClass({
  /* Render
  */

  render() {
    const { question, answer } = this.props;

    return (
      <PublicContentShow
        canRemove={false}
        schema={Tests.PageContentSchema}
        index={0}
        doc={
          new Tests.PageContentSchema({
            type: question,
            question: question._id,
          })
        }
      />
    );
  },
});

export default TeacherAttemptGradeMenuQuestionAnswer;

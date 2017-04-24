// Libs
import React from 'react';
import { TextField } from 'material-ui';

const TeacherAttemptGradeMenuQuestion = React.createClass({

  // Lifecycle

  getInitialState() {
    const { answer } = this.props;
    return { grade: (answer.get('grade') || 0) * 100 };
  },

  /* Handlers
  */

  handleGradeChange(event, percentage) {
    const { answer } = this.props;
    let value = percentage.replace('%', '');
    if (!percentage.includes('%'))
      value = value.substring(0, value.length - 1);
    const grade = _.toNumber(value);
    if (
      (
        Match.Regex(grade).decimal()
        && !_.isNaN(grade)
        && grade <= 100
      ) || value == ''
    ) {
      this.setState({ grade });
      Meteor.call('TeacherAnswerGrade', answer._id, grade ? grade / 100 : null, err => {
        if (err) {
          console.error(err);
          return;
        } else return `${grade}%`;
      });
    } else return;
  },

  /* Render
  */

  render() {
    const { test, question, answer } = this.props;
    const { grade } = this.state;

    return (
      <div className='ui basic segment' style={{ marginLeft: '5px' }} >
        <div className='ui grid'>

          <div className='sixteen wide column' >
            <PublicContentShow
              canRemove={false}
              schema={Tests.PageContentSchema}
              index={0}
              doc={
                new Tests.PageContentSchema({
                  type: 'question',
                  question: question._id,
                })
              }
            />
          </div>

          <div className='sixteen wide column' >
            <TextField
              value={`${grade}%`}
              hintText='Nota'
              floatingLabelText='Nota'
              onChange={this.handleGradeChange}
            />
          </div>


        </div>
      </div>
    );
  },
});

export default TeacherAttemptGradeMenuQuestion;

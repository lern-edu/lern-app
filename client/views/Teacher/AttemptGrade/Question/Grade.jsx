import React from 'react';

TeacherAttemptGradeQuestionGrade = React.createClass({
  /* Handlers
  */

  handleInput(str) {
    const { answer } = this.props;
    let float = parseFloat(str.replace(/,/, '.'));
    if (!_.isFinite(float)) float = null;
    else if (0 > float) float = 0;
    else if (float > 100) float = 1;
    else float = float / 100;
    Meteor.call('TeacherAnswerGrade', answer._id, float, err => err ? console.log(err) : undefined);
  },

  /* Render
  */

  render() {
    const { answer } = this.props;

    return (
      <div className='ui vertical segment'>
        <div className='ui centered grid'>
          <div className='ten wide center aligned column'>
            <div className='ui large right labeled input'>
              <Semantic.Input type='text' placeholder='Sem Nota' defaultValue={_.isFinite(answer.grade) ? answer.grade * 100 : ''} onInput={this.handleInput}/>
              <div className='ui basic label'>
                %
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
});

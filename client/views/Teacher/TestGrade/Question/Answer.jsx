import React from 'react';

TeacherTestGradeQuestionAnswer = React.createClass({
  /* Render
  */

  render() {
    const { question, answer } = this.props;

    return (
      <div className='ui vertical segment'>

        <div className='ui grid'>

          <div className='centered center aligned ten wide column'>

            {question.type === 'open' ?
              <p>{answer.answer}</p>
            : question.type === 'closed' ?
              <div className='ui very relaxed vertical text menu'>
                {_.map(question.options, (opt, i) =>
                  <Semantic.Button className={`item ${answer.answer === i || question.answer === i ? 'active' : ''} ${question.answer === i ? 'blue' : 'red'}`} key={i}>
                    <div className='content'>
                      <div className='header'>{opt.text}</div>
                    </div>
                  </Semantic.Button>
                )}
              </div>
            : undefined}

            </div>

        </div>

      </div>
    );
  },
});

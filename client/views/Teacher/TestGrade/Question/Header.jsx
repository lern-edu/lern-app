import React from 'react';

TeacherTestGradeQuestionHeader = React.createClass({
  /* Handlers
  */

  handleNextClick() {
    const { test, question, answers } = this.props;
    const index = _.indexOf(test.questions, question._id);
    const sorted = _.concat([], _.slice(test.questions, index + 1), _.slice(test.questions, 0, index));
    const filtered = _.reject(sorted, q => _.get(_.find(answers, { question: q }), 'finished'));
    const target = _.first(filtered);
    FlowRouter.setParams({ questionId: target });
  },

  /* Render
  */

  render() {
    const { test, question, answer, attempt, subjects } = this.props;

    const index = _.indexOf(test.questions, question._id);

    const duration = answer && answer.getDuration();
    const expired = test.timeoutType === 'question' && test.timeout * 1000 < duration;

    const score = _.isArray(test.score) && _.isFinite(test.scores[index]) && _.isFinite(answer.grade) && test.scores[index] * answer.grade;

    return (
      <div className='ui vertical segment'>
        <div className='ui grid'>

          <div className='center aligned row'>

            <div className='three wide column'>
              <div className='ui mini statistic'>
                <div className='value'>{_.isFinite(score) ? numeral(score).format('0.[00]') : 'Ausente'}</div>
                <div className='label'>Nota</div>
              </div>
            </div>

            <div className='ten wide column'>
              <h1 className='ui header'>
                Questão {1 + index}
              </h1>
            </div>

            <div className='three wide column'>
              <div className={`ui mini statistic ${expired ? 'red' : ''}`}>
                <div className='value'>{!duration ? 'Ausente' : numeral(duration / 1000).format('00:00:00')}</div>
                <div className='label'>{`Tempo ${expired ? 'Extrapolado' : ''}`}</div>
              </div>
            </div>

          </div>

          <div className='row'>

            <div className='centered center aligned ten wide column'>
              <p>{question.text}</p>
            </div>

          </div>

        </div>
      </div>
    );
  },
});

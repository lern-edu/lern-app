import React from 'react';

StudentTestAttemptMenu = React.createClass({
  mixins: [Semantic.Transition('fly left')],

  /* Handlers
  */

  handleItemClick({ questionId }) {
    const { question } = this.props;
    if (question && question._id === questionId)  FlowRouter.setParams({ questionId: null });
    else FlowRouter.setParams({ questionId });
  },

  /* Render
  */

  render() {
    const { test, questions, answers, attempt } = this.props;

    return (
      <div className='ui link vertical text menu' ref='animate'>
        <div className='header item'>Progresso</div>

        {_.map(test.questions, (q, i) => {
          const question = _.find(questions, { _id: q });
          const answer = _.find(answers, { question: q });
          const state = !answer ? 'idle' : answer.finished ? 'done' : 'onit';
          const stateColors = { idle: '', done: 'green', onit: 'orange' };
          return (
            <Semantic.Button className={`active item ${stateColors[state]}`} key={q} onClick={this.handleItemClick} questionId={q}>
              <div className='active red content'>Questão {i + 1}</div>
            </Semantic.Button>
          );
        })}
      </div>
    );
  },
});

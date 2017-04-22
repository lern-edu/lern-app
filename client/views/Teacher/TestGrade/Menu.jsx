import React from 'react';

TeacherTestGradeMenu = React.createClass({
  mixins: [Semantic.Transition('fly left')],

  /* Handlers
  */

  handleItemClick({ questionId }) {
    const { question } = this.props;
    if (questionId === 'back') FlowRouter.setParams({ questionId: null });
    else if (question && question._id === questionId)
      FlowRouter.setParams({ questionId: null });
    else FlowRouter.setParams({ questionId });
  },

  /* Render
  */

  render() {
    const { test, questions, answers } = this.props;

    return (
      <div className='ui link vertical text menu' ref='animate'>
        <div className='header item'>Progresso</div>

        {_.map(test.questions, (q, i) => {
          const question = _.find(questions, { _id: q });
          const answer = _.find(answers, { question: q });
          const state = !answer ? 'nope' : _.isFinite(answer.grade) ? 'yep' : 'meh';
          const stateColors = { nope: 'red', yep: 'green', meh: '' };
          return (
            <Semantic.Button className={`active item ${stateColors[state]}`} key={q} onClick={this.handleItemClick} questionId={q}>
              <div className='active red content'>Questão {i + 1}</div>
            </Semantic.Button>
          );
        })}
        <Semantic.Button key='back' onClick={this.handleItemClick} questionId='back'>
          <div className='active red content'>Voltar</div>
        </Semantic.Button>
      </div>
    );
  },
});

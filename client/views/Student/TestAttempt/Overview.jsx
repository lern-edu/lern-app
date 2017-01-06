import React from 'react';

StudentTestAttemptOverview = React.createClass({

  /* Handlers
  */

  handleSubmit() {
    const { test } = this.props;
    Meteor.call('StudentAttemptFinish', test._id, err => err ? console.log(err)
      : FlowRouter.go('StudentTest', { testId: test._id }));
  },

  /* Render
  */

  render() {
    const { test, answers } = this.props;

    const finishedQuestions = _.get(_.filter(test.questions, q =>
        _.get(_.find(answers, { question: q }), 'finished')), 'length');
    const testLength = _.get(test, 'questions.length');

    return (
      <div className='ui basic segment grid'>

        <div className='centered center aligned ten wide column'>

          <h2 className='ui header'>
            Prova em andamento
            <div className='sub header'>
              Clique nas questões à direita para respondê-las
            </div>
          </h2>

          <Semantic.Progress
            classes='indicating'
            data-total={testLength}
            data-value={finishedQuestions}>
            <div className='bar' />
            <div className='label'>{finishedQuestions} de {
              testLength}</div>
          </Semantic.Progress>

          <Semantic.Button
            classes={finishedQuestions === testLength ? 'blue' : ''}
            onClick={this.handleSubmit}>
            <i className='send icon' />
            Enviar
          </Semantic.Button>

        </div>

      </div>
    );
  },
});

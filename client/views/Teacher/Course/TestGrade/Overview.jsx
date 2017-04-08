import React from 'react';

TeacherTestGradeOverview = React.createClass({
  mixins: [Semantic.Transition({ appear: 'scale', enter: 'scale' })],

  getAttemptScore() {
    const { test, attempt, answers } = this.props;

    const ans = _.map(test.questions, q => _.find(answers, { question: q, attempt: attempt._id }));
    const aprov = _.map(ans, 'grade');
    const grades = _.zipWith(aprov, test.scores, (a, b) => a * b);
    return _.sum(grades) || 0;
  },

  getAttemptGrade() {
    const { test, attempt, answers } = this.props;

    const ans = _.map(test.questions, q => _.map(answers, { question: q, attempt: attempt._id }));
    const aprov = _.map(ans, 'grade');
    return _.mean(aprov) || 0;
  },

  handleSubmit() {
    const { attempt, test } = this.props;
    const score = this.getAttemptScore();
    const grade = test.scores ? score / _.sum(test.scores) : this.getAttemptGrade();
    Meteor.call('TeacherAttemptGrade', attempt._id, grade, err => {
      if (err) console.log(err);
      else {
        snack('Correção salva', 'green checkmark');
        FlowRouter.go('TeacherTestShow', { courseId: test.course, testId: test._id });
      }
    });
  },

  /* Render
  */

  render() {
    const { test, attempt, answers, question } = this.props;

    const correctedQuestions = _.filter(test.questions, q => _.isFinite(_.get(_.find(answers, { question: q }), 'grade')));
    const finalScore = this.getAttemptScore();

    return (
      <div className='ui basic segment centered grid' ref='animate'>

        <div className='row'>
          <div className='center aligned ten wide column'>
            <h2 className='ui header'>
              Correção em andamento
              <div className='sub header'>
                Clique nas questões à direita para corrigi-las
              </div>
            </h2>
          </div>
        </div>

        <div className='row'>
          <div className='centered center aligned ten wide column'>
            <Semantic.Progress classes='indicating' data-total={test.questions.length} data-value={correctedQuestions.length}>
              <div className='bar' />
              <div className='label'>{correctedQuestions.length} de {test.questions.length}</div>
            </Semantic.Progress>
          </div>
        </div>

        {!_.isFinite(finalScore) || !_.isFinite(test.score) ? undefined :
        <div className='row'>
          <div className='centered center aligned eight wide column'>
            <div className='ui two small statistics'>
              <div className='statistic'>
                <div className='value'>{finalScore}</div>
                <div className='label'>Nota Final</div>
              </div>
              <div className='statistic'>
                <div className='value'>{numeral(finalScore / _.sum(test.scores)).format('0[.]0%')}</div>
                <div className='label'>Aproveitamento</div>
              </div>
            </div>
          </div>
        </div>}

        <div className='row'>
          <div className='centered center aligned ten wide column'>
            <Semantic.Button classes={correctedQuestions.length === test.questions.length ? 'blue' : 'disabled'} onClick={this.handleSubmit}>
              <i className='send icon' />
              Lançar
            </Semantic.Button>
          </div>
        </div>

      </div>
    );
  },
});

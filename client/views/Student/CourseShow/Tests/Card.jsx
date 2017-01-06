import React from 'react';

StudentCourseShowTestsCard = React.createClass({

  /* Handlers
  */

  handleStart({ testId }) {
    const { tests } = this.props;
    const test = _.find(tests, { _id: testId });

    Meteor.call('StudentAttemptStart', testId, err =>
      err ? console.log(err) : (
        _.get(test, 'type') === 'cognitive' ?
        FlowRouter.go('StudentTestAttemptCognitive', { testId })
        : FlowRouter.go('StudentTestAttempt', { testId }))
      );
  },

  handleContinue({ testId }) {
    const { tests } = this.props;
    const test = _.find(tests, { _id: testId });
    if (_.get(test, 'type') === 'cognitive')
      FlowRouter.go('StudentTestAttemptCognitive', { testId });
    else FlowRouter.go('StudentTestAttempt', { testId });
  },

  handleAttempts({ testId }) {
    FlowRouter.go('StudentTest', { testId });
  },

  /* Render
  */

  render() {
    const { test, subjects, course, tags, attempts } = this.props;
    const atts = _.filter(attempts, { test: test._id });

    return (
      <div className='ui card'>
        <div className='content'>
          <div className='header'>{test.name}</div>
          <div className='meta'>{test.questions.length} questões</div>
          <div className='meta'>{test.scores ? `Valor: ${_.sum(test.scores)} pontos` : 'Simulado'}</div>
          <div className='meta'>{`${TestTimeoutTypes.getName(test.timeoutType)}: ${numeral(test.timeout).format('00:00:00')}`}</div>
        </div>
        <div className='extra content'>
          <div className='ui list'>
            {_.map(test.tags, t =>
              <div className='item' key={t}>
                {_.get(_.find(tags, { _id: t }), 'text')}
              </div>
            )}
          </div>
        </div>
        <div className='extra content'>
          <div className='ui two buttons'>
            {atts.length === 0 ?
              <Semantic.Button classes='green' onClick={this.handleStart} testId={test._id}>Começar</Semantic.Button>
            : _.every(atts, 'finished') ? [
              <Semantic.Button key='try' classes='labeled' onClick={this.handleStart} testId={test._id}>
                <div className='ui blue button'>Começar</div>
                <Semantic.Popup parent={this} classes='ui basic blue left pointing label'>
                  {atts.length}
                  <div className='ui popup'>Tentativas terminadas</div>
                </Semantic.Popup>
              </Semantic.Button>,
              <Semantic.Button key='see' classes='labeled' onClick={this.handleAttempts} testId={test._id}>
                <div className='ui green button'>Ver tentativas</div>
              </Semantic.Button>
            ]
            : <Semantic.Button classes='orange' onClick={this.handleContinue} testId={test._id}>Continuar</Semantic.Button>}
          </div>
        </div>
      </div>
    );
  },
});

import React from 'react';
import { FlatButton } from 'material-ui';

StudentCourseShowTestsCard = React.createClass({

  /* Handlers
  */

  handleStart() {
    const { test: { _id: testId }, test } = this.props;

    //const test = _.find(tests, { _id: test._id });
    Meteor.call('StudentAttemptStart', testId, err =>
      err ? console.log(err) : (
        _.get(test, 'type') === 'cognitive' ?
        FlowRouter.go('StudentTestAttemptCognitive', { testId })
        : FlowRouter.go('StudentTestAttempt', { testId }))
      );
  },

  handleContinue() {
    const { test: { _id: testId }, test } = this.props;

    //const test = _.find(tests, { _id: testId });
    if (_.get(test, 'type') === 'cognitive')
      FlowRouter.go('StudentTestAttemptCognitive', { testId });
    else FlowRouter.go('StudentTestAttempt', { testId });
  },

  handleAttempts() {
    const { test: { _id: testId } } = this.props;
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
              <FlatButton
                label='Começar'
                style={{ backgroundColor: 'green', width: '100%' }}
                onTouchTap={this.handleStart}
              />
            : _.every(atts, 'finished') ? [
              <FlatButton key='try' onTouchTap={this.handleStart} style={{ width: '100%' }}>
                <div className='ui blue button'>Começar</div>
                <div className='ui basic blue left pointing label'>
                  {atts.length}
                  <div className='ui popup'>Tentativas terminadas</div>
                </div>
              </FlatButton>,
              <FlatButton key='see' onTouchTap={this.handleAttempts}>
                <div className='ui green button'>Ver tentativas</div>
              </FlatButton>,
            ]
            : <FlatButton
                label='Continuar'
                style={{ backgroundColor: 'orange', width: '100%' }}
                onTouchTap={this.handleContinue}
              />}
          </div>
        </div>
      </div>
    );
  },
});

import React from 'react';
import { RaisedButton, Card, CardMedia } from 'material-ui';

StudentTestAttemptQuestionHeader = React.createClass({

  componentDidMount() {
    this.interval = setInterval(() => this.forceUpdate(), 1000);
  },

  componentWillUnmount() {
    clearInterval(this.interval);
  },

  handleClick() {
    const { answer, test, question, answers } = this.props;
    if (answer.finished) this.nextTarget();
    else this.finishAnswer();
  },

  render() {
    const { test, question, answer, attempt, subjects } = this.props;

    let enumImage = null;
    if (question.image) {
      enumImage = _.first(_.filter(question.images, img => img._id == question.image));
    };

    const state = !answer ? 'idle' : answer.finished ? 'done' : 'onit';

    const now = _.now();
    const startTime = { question: answer.startedAt, global: attempt.startedAt }[test.timeoutType];
    const endTime = state === 'onit' || test.timeoutType === 'global' ? now : answer.finishedAt;
    let remaining = test.timeout + (startTime - endTime) / 1000;
    let expired = remaining < 0;

    // HACK:
    if (test.timeoutType === 'none') {
      remaining = (now - attempt.startedAt) / 1000;
      expired = false;
    };

    return (
      <div className='ui vertical segment'>
        <div className='ui grid'>

          <div className='center aligned row'>

            {_.isEqual(test.timeoutType, 'none') ? undefined :
            <div className='two wide column' style={{ marginLeft: '1em' }}>
              <div className='ui mini statistic'>
                <div className='label'>Tempo</div>
                <div className='value'>{expired ? 'Expirado'
                  : numeral(remaining).format('00:00:00')}</div>
              </div>
            </div>}

          </div>

          <div className='row'>

            <div className='centered center aligned ten wide computer fourteen wide mobile column'>
                <div style={{ textAlign: 'justify', textJustify: 'inter-word', WebkitUserSelect: 'none', WebkitTouchCallout: 'none', MozUserSelect: 'none', msUserSelect: 'none', fontSize: '18px'}}
                  dangerouslySetInnerHTML={{ __html: question.text }} />
            </div>

          </div>

          {enumImage ? (
            <Card className='centered center aligned ten wide computer fourteen wide mobile column'>
                <CardMedia>
                <img className='ui centered fluid image' src={enumImage.url()}
                  style={{ padding: '2em', maxWidth: '900px' }}/>
                </CardMedia>
            </Card>
          ) : undefined}

        </div>
      </div>
    );
  },
});

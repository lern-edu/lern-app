import React from 'react';
import { Card, CardHeader, CardTitle, CardText, FlatButton, } from 'material-ui';

const StudentCourseShowLecturesCard = React.createClass({

  handleAttemptTest() {
    const { lecture, course, tags, tests, attempts } = this.props;
    const { _id: testId } = _.find(tests, { _id: lecture.test });
    const atts = _.filter(attempts, { test: testId });
    _.isEmpty(atts) || _.every(atts, 'finished') ?
    Meteor.call('StudentAttemptStart', testId, err =>
      err ? snack('Problemas ao começar teste!') :
      FlowRouter.go('StudentTestAttempt', { testId })
    ) : FlowRouter.go('StudentTestAttempt', { testId });
  },

  /* Render
  */

  render() {
    const { lecture, course, tags, tests, attempts } = this.props;
    const test = _.find(tests, { _id: lecture.test });

    return (
      <div className='sixteen wide mobile eight wide tablet five wide computer column'>
        <Card>
          <CardHeader
            title={moment(lecture.startDate).format('L')}
            subtitle={`${moment(lecture.startDate).format('LT')} - ${
                moment(lecture.endDate).format('LT')}`} />
          <CardText>
            {_.map(lecture.tags, t =>
              <div className='item' key={t}>
                {_.get(_.find(tags, { _id: t }), 'text')}
              </div>
            )}
            <p>{lecture.info}</p>
            {_.isEmpty(test) ? undefined :
              <FlatButton
              onTouchTap={this.handleAttemptTest}

              label={_.get(test, 'name')}
              labelPosition='before'
              secondary={true} />}
          </CardText>
        </Card>
      </div>
    );
  },
});

export default StudentCourseShowLecturesCard;

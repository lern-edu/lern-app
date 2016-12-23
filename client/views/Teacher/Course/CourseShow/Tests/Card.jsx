import React from 'react';
import { Card, CardHeader, CardText, FlatButton, CardActions } from 'material-ui';

TeacherCourseShowTestsCard = React.createClass({
  mixins: [Semantic.Transition('scale')],

  // Static data

  data: {
    stateName: { past: 'Finalizada', present: 'Em Andamento', future: 'Agendada' },
  },

  /* Render
  */

  render() {
    const { data: { stateName }, props: { test, subjects, course, tags, styles,
    styles: { cardContainer, cardContent }, }, } = this;
    const now = _.now();
    const state = now > 0 ? 'past' : now < test.startDate ? 'future' : 'present';

    return (
      <div {...cardContainer}>
        <Card {...cardContent}>
          <CardHeader
            title={_.get(test, 'name')}
            subtitle={_.get(stateName, state)} />
          <CardText>
            <p>{_.map(test.subjects, t =>
                _.get(_.find(subjects, { _id: t }), 'name')).join(', ')}</p>
            <p>{`Término: ${moment(_.get(test, 'endDate')).format('LL')}`}</p>
            <p>{`${test.questions.length} questões`}</p>
            <p>{test.scores ? `Valor: ${_.sum(test.scores)} pontos` : 'Simulado'}</p>
          </CardText>
          {_.isEmpty(test) ? undefined :
            <CardActions>
              <FlatButton
              href={_.get(test, 'type') === 'cognitive' ?
            FlowRouter.path('TeacherTestShowCognitive', { courseId: course._id, testId: test._id })
            : FlowRouter.path('TeacherTestShow', { courseId: course._id, testId: test._id })}
              linkButton={true}
              label='Ver'
              secondary={true} />
            </CardActions>}
        </Card>
      </div>
    );
  },
});

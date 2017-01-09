import React from 'react';
import { Card, CardActions, CardTitle, Divider, FlatButton, CardText, List, ListItem, } from 'material-ui';

StudentCoursesGalleryCard = React.createClass({
  /* Render
  */

  render() {
    const { ready, course, subjects } = this.props;

    return (
      <div className='sixteen wide mobile eight wide tablet four wide computer column'>
        <Card>
          <CardTitle
            title={course.name} />
          <CardText>
            <List secondaryText='Matérias'>
              {_.map(course.subjects, s =>
                <ListItem
                  key={s}
                  disabled={true}
                  primaryText={_.get(_.find(subjects, { _id: s }), 'name')} />)}
            </List>
            <Divider />
            <List secondaryText='Grade de horários'>
              {_.map(course.schedule, ({ day, endDate, startDate }, i) =>
                <ListItem
                  key={`${day}-${i}`}
                  disabled={true}
                  primaryText={WeekDays.getName(day)}
                  secondaryText={`de ${
                    moment(startDate).format('LT')} até ${
                    moment(endDate).format('LT')}`} />)}
            </List>
            <Divider />
            <List secondaryText={`${course.students.length} alunos`} />
          </CardText>
          <CardActions>
            <FlatButton

              primary={true}
              href={FlowRouter.path('StudentCourseShow', { courseId: course._id })}
              label='Entrar' />
          </CardActions>
        </Card>
      </div>
    );
  },
});

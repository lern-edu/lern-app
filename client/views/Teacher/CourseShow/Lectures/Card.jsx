import React from 'react';
import { Card, CardHeader, CardText, FlatButton, CardActions } from 'material-ui';

TeacherCourseShowLecturesCard = React.createClass({
  mixins: [Semantic.Transition('scale')],

  /* Render
  */

  render() {
    const { course, lecture, tags } = this.props;

    return (
      <Card className='sixteen wide mobile eight wide tablet four wide computer column' >
        <CardHeader
          title={moment(lecture.startDate).format('DD/MM')}
          subtitle={
            `${moment(lecture.startDate).format('LT')
            } - ${moment(lecture.endDate).format('LT')}`
          }
        />
        <CardText>
          <p>{_.map(lecture.tags, t => _.get(_.find(tags, { _id: t }), 'text')).join(', ')}</p>
          {/* <p>{lecture.info}</p> */}
          <p>{lecture.attendants ? `${lecture.attendants.length} presentes`
          : 'Sem dados de presença'}</p>
        </CardText>
        <CardActions>
          <FlatButton
          href={
            FlowRouter.path('TeacherLectureAttendance',
              { lectureId: lecture._id, courseId: course._id }
            )
          }
          label='Ver'
          secondary={true}
        />
        </CardActions>
      </Card>
    );
  },
});

import React from 'react';
import { Card, CardHeader, CardText, FlatButton, CardActions, Chip, Divider } from 'material-ui';

export default class TeacherCourseShowLecturesCard extends React.Component {

  /* Render
  */

  render() {
    const { course, lecture, tags } = this.props;

    return (
      <div className='sixteen wide mobile eight wide tablet five wide computer column'>
        <Card>

          <CardHeader
            title={lecture.get('name')}
            actAsExpander={true}
            showExpandableButton={true}
            subtitle={
              `Aula ${moment(lecture.startDate).format('DD/MM')
              }: ${moment(lecture.startDate).format('LT')
              } - ${moment(lecture.endDate).format('LT')}`
            }
          />

          <CardText expandable={true}>

            {
              _.map(lecture.get('info'), (info, index) =>
                <PublicContentShow
                  key={index}
                  canRemove={false}
                  index={index}
                  schema={Lectures.ContentSchema}
                  doc={info}
                />
              )
            }

            <div className='row'>
              <div className='sixteen wide column'>
                <Divider />
              </div>
            </div>

            <div className='row'>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {
                  _.map(lecture.tags, t =>
                    <Chip key={t} style={{ margin: 4 }} >
                      {_.get(_.find(tags, { _id: t }), 'text')}
                    </Chip>
                  )
                }
              </div>
            </div>

          </CardText>

          <CardActions>

            <FlatButton
              href={
                FlowRouter.path(
                  'TeacherLectureAttendance',
                  { lectureId: lecture._id, courseId: course._id }
                )
              }
              label='Ver'
              primary={true}
            />
            <FlatButton
              href={
                FlowRouter.path(
                  'TeacherLectureEdit',
                  { lectureId: lecture._id, courseId: course._id }
                )
              }
              label='Editar'
              secondary={true}
            />
          </CardActions>
        </Card>
      </div>
    );
  }

};

import React from 'react';
import { FontIcon, IconButton, Chip, Divider, CardText, Avatar } from 'material-ui';
import { Card, Badge, CardActions, CardHeader } from 'material-ui';

const TeacherLectureAttendanceContent = React.createClass({

  /* Get Context
  */

  contextTypes: {
    user: React.PropTypes.object,
  },

  // Render

  render() {
    const { lecture, subjects, tags, author } = this.props;
    const { user } = this.context;

    const profilePic = _.get(author, 'profile.profilePic');

    return (
      <Card className='ui basic segment'>
        <CardHeader
          actAsExpander={true}
          showExpandableButton={true}
          avatar={
            profilePic
            ? <Avatar size={40} src={profilePic} />
            : <Avatar size={40} size={32}>
              {_.first(_.get(author, 'profile.name'))}
            </Avatar>
          }
          title={author.get('profile.name')}
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
                  schema={Posts.ContentSchema}
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
                  _.map(lecture.get('tags'), t =>
                    <Chip key={t} style={{ margin: 4 }} >
                      {_.get(_.find(tags, { _id: t }), 'text')}
                    </Chip>
                  )
                }
              </div>
            </div>
        </CardText>
        <CardActions>

        </CardActions>
      </Card>
    );
  },

});

export default TeacherLectureAttendanceContent;

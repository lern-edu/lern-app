import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, Divider } from 'material-ui';
import { FlatButton, CardText, Chip } from 'material-ui';

const TeacherCourseShowPostsCard = React.createClass({

  // Handles

  handleClick() {
    const { post, courseId } = this.props;
    FlowRouter.go('TeacherPostEdit', { courseId, postId: post._id });
  },

  // Render

  render() {
    const { post, tags, subjects } = this.props;

    return (
      <div className='sixteen wide mobile eight wide tablet five wide computer column' >
        <Card>
          <CardHeader
            title={post.get('name')}
            actAsExpander={true}
            showExpandableButton={true}
            subtitle={moment(post.get('createdAt')).format('DD/MM')}
          />
          <CardText expandable={true}>

            {
              _.map(post.get('content'), (info, index) =>
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
                  _.map(post.get('tags'), t =>
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
              label='Ver'
              primary={true}
              href={FlowRouter.path('TeacherPostShow', { postId: post._id })}
            />
            <FlatButton
              href={FlowRouter.path('TeacherPost', { postId: post._id })}
              label='Editar'
              secondary={true}
            />
          </CardActions>
        </Card>
      </div>
    );
  },

});

export default TeacherCourseShowPostsCard;

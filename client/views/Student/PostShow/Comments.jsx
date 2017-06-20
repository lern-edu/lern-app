import React from 'react';
import PropTypes from 'prop-types';
import { CardText, Avatar } from 'material-ui';
import { Card, CardHeader, CardTitle } from 'material-ui';

const StudentPostShowComments = React.createClass({

  /* Get Context
  */

  contextTypes: {
    user: PropTypes.object,
  },

  // Render

  render() {
    const { post, users } = this.props;
    const { user } = this.context;

    return (
      <div>
        <Card className='ui basic segment'>
          <CardTitle title='Comentários' />
        </Card>

        {
          _.map(post.comments, (c, i) => {
              const user = _.find(users, { _id: c.get('author') });
              const profilePic = _.get(user, 'profile.profilePic');
              return (
                <Card className='ui basic segment' key={`${c.get('author')}-${i}`}>
                  <CardHeader
                    avatar={
                      profilePic
                      ? <Avatar size={40} src={profilePic} />
                      : <Avatar size={40} size={32}>
                        {_.first(_.get(user, 'profile.name'))}
                      </Avatar>
                    }
                    title={_.get(user, 'profile.name')}
                    subtitle={moment(c.get('createdAt')).fromNow()}
                  />
                  <CardText>

                    <div className='sixteen wide column'>
                      {
                        _.map(c.get('content'), (s, i) =>
                          <div style={{ width: '100%' }} key={i} >
                            <PublicContentShow
                              schema={Posts.ContentSchema}
                              canRemove={false}
                              field='content'
                              form={this}
                              index={i}
                              doc={s}
                            />
                          </div>
                        )
                      }
                    </div>

                  </CardText>
                </Card>
              );
            }
          )
        }
      </div>
    );
  },

});

export default StudentPostShowComments;

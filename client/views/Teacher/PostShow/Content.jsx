import React from 'react';
import PropTypes from 'prop-types';
import { FontIcon, IconButton, Chip, Divider, CardText } from 'material-ui';
import { Card, Badge, CardActions, CardHeader, Avatar } from 'material-ui';

const TeacherPostShowContent = React.createClass({

  // lifecycle

  getInitialState() {
    const { context: { user : { _id } },
      props: { post: { author, like=[], useless=[], comments=[] } }, } = this;
    const actions = {
      thumb_up: {
        label: 'Ajudou!',
        action: this.handleLikeChange,
        field: 'like',
      },
      not_interested: {
        label: 'Não é interessante',
        action: this.handleUselessChange,
        field: 'useless',
      },
    };

    if (_.isEqual(_id, author)) _.assign(actions, { edit: {
        label: 'Editar',
        action: this.handleEditPost,
      },
    });

    return { actions };
  },

  // Handler

  handleLikeChange(event) {
    const { props: { post: { _id: postId } }, context: { user : { _id: userId } } } = this;
    Meteor.call('UserLikePost', { postId, userId }, (err, msg) =>
      snack(msg.includes('useless') ? 'Você já marcou esse post como não interessante' :
        'Obrigado por nos dizer!'));
  },

  handleUselessChange() {
    const { props: { post: { _id: postId } }, context: { user : { _id: userId } } } = this;
    Meteor.call('UserUselessPost', { postId, userId }, (err, msg) =>
      snack(msg.includes('like') ? 'Você já disse que esse post te ajudou' :
        'Obrigado por nos dizer!'));
  },

  handleEditPost() {
    const { props: { post: { _id: postId } } } = this;
    FlowRouter.go('TeacherPost', { postId });
  },

  /* Get Context
  */

  contextTypes: {
    user: PropTypes.object,
  },

  // Render

  render() {
    const { post, subjects, tags, author } = this.props;
    const { actions } = this.state;
    const { user } = this.context;

    const profilePic = _.get(author, 'profile.profilePic');

    return (
      <Card className='ui basic segment'>
        <CardHeader
          avatar={
            profilePic
            ? <Avatar size={40} src={profilePic} />
            : <Avatar size={40} size={32}>
              {_.first(_.get(author, 'profile.name'))}
            </Avatar>
          }
          title={author.get('profile.name')}
          subtitle={moment(post.get('createdAt')).fromNow()}
        />
        <CardText>

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
          {
            _.map(actions, ({ label, action, field }, icon) =>
              field
              ? <Badge
                key={icon}
                badgeContent={_.get(post, field + '.length') || 0}
                primary={true}
                badgeStyle={{ top: 12, right: 12 }} >
                  <IconButton tooltip={label} touch={true} tooltipPosition='top-center'
                    onTouchTap={action}
                    children={
                      <FontIcon className='material-icons' >
                        {icon}
                      </FontIcon>
                    }
                  />
              </Badge>
              : <IconButton
                tooltip={label}
                touch={true}
                tooltipPosition='top-center'
                onTouchTap={action}
                key={icon}
                children={
                  <FontIcon className='material-icons' >
                    {icon}
                  </FontIcon>
                }
              />
            )
          }
        </CardActions>
      </Card>
    );
  },

});

export default TeacherPostShowContent;

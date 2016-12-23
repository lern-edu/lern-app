import React from 'react';
import { Card, Badge, CardActions, CardHeader, CardMedia, CardTitle, FlatButton, CardText, FontIcon, IconButton, } from 'material-ui';

StudentPostCard = React.createClass({

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

      // insert_comment: {
      //   label: 'Comentar',
      //   action: this.handleComment,
      //   field: 'comments',
      // },
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

  handleComment() {
    console.log('fasww');
  },

  handleEditPost() {
    const { props: { post: { _id: postId } } } = this;
    FlowRouter.go('StudentPostEdit', { postId });
  },

  /* Get Context
  */

  contextTypes: {
    user: React.PropTypes.object,
  },

  // Render

  render() {
    const { props: { post: { title, createdAt, text, author, }, post,
        images, documents, tags, subjects, }, context: { user },
        state: { actions, }, } = this;

    return (
      <Card className='ui basic segment'>
        <CardTitle title={title} subtitle={moment(createdAt).format('L')} />
        <CardText>
          <p><b style={{ textAlign: 'center',
            lineHeight: '24px', }}>{_.uniq(_.map(subjects, 'name')).join(' ,')}</b></p>
          <p><b style={{ textAlign: 'center',
            lineHeight: '24px', }}>{_.map(tags, 'text').join(', ')}</b></p>
          <p>{text}</p>
          {_.map(documents, document =>
            <p key={document._id}>
              <a href={document.url()} target='_blank'>
                <FlatButton
                label={document.original.name}
                labelPosition='before'
                secondary={true}
                icon={<FontIcon className='material-icons' >cloud_download</FontIcon>}
                />
              </a>
            </p>)}
        </CardText>
        {_.map(images, image =>
          <CardMedia key={image._id}>
            <img src={image.url()} />
          </CardMedia>)}
        <CardActions>
          {_.map(actions, ({ label, action, field }, icon) =>
            field ? <Badge key={icon}
              badgeContent={_.get(post, field + '.length') || 0}
              primary={true}
              badgeStyle={{ top: 12, right: 12 }} >
                <IconButton tooltip={label} touch={true} tooltipPosition='top-center'
                  onTouchTap={action}
                  children={<FontIcon className='material-icons' >{icon}</FontIcon>} />
            </Badge> : <IconButton tooltip={label} touch={true} tooltipPosition='top-center'
              onTouchTap={action} key={icon}
              children={<FontIcon className='material-icons' >{icon}</FontIcon>} />)}
        </CardActions>
      </Card>
    );
  },

});

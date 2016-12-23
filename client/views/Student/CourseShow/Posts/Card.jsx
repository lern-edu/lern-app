import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, RaisedButton, FlatButton, CardText, FontIcon, } from 'material-ui';

StudentCourseShowPostsCard = React.createClass({

  // Handles

  handleClick() {
    console.log('hey');
  },

  // Render

  render() {
    const { post, images, documents, tags, subjects } = this.props;

    const filteredTags = _.map(post.tags, pt =>
      _.first(_.filter(tags, t => t._id === pt)));

    const filteredSubjects = _.map(filteredTags, ft =>
      _.first(_.filter(subjects, s => s._id === ft.subject)));

    return (
      <Card>
        <CardHeader
          title={post.title}
          subtitle={moment(post.createdAt).format('L')}
        />
        {post.images ? _.map(post.images, imageId => {
          const image = _.first(_.filter(images, img => img._id === imageId));
          return (
            <CardMedia key={imageId}>
              <img src={image.url()} />
            </CardMedia>
          );
        }) : undefined}
        <CardTitle
          title={_.uniq(_.map(filteredSubjects, 'name')).join(' ,')}
          subtitle={_.map(filteredTags, 'text').join(', ')} />
        <CardText>
          <p>{post.text}</p>
          {post.documents ? _.map(post.documents, docId => {
            const document = _.first(_.filter(documents, doc => doc._id === docId));
            return (
              <p key={docId}>
                <a href={document.url()} target='_blank'>
                  <FlatButton
                  label={document.original.name}
                  labelPosition='before'
                  secondary={true}
                  icon={<FontIcon className='material-icons' >cloud_download</FontIcon>}
                  />
                </a>
              </p>
            );
          }) : undefined}
        </CardText>


          {Meteor.userId() === post.author ? (
            <CardActions>
              <RaisedButton label='Editar' primary={true} onClick={this.handleClick} />
            </CardActions>
          ) : undefined}

      </Card>
    );
  },

});

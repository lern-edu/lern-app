import React from 'react';
import { RaisedButton, CardText } from 'material-ui';
import { Card, CardActions, CardTitle } from 'material-ui';

const StudentPostShowNewComment = React.createClass({
  mixins: [AstroForm(Posts.CommentSchema)],

  // Handler

  handleComment() {
    const { post: { _id: postId } } = this.props;
    const { user: { _id: userId } } = this.context;

    Meteor.call(
      'UserCommentPost',
      { postId, userId },
      this.doc,
      (err, comment) => {
        if (err) {
          console.error(err);
          snack('Não é possível comentar');
        } else {
          snack('Comentado!');
          this.doc = new Posts.CommentSchema();
        };
      }
    );
  },

  /* Get Context
  */

  contextTypes: {
    user: React.PropTypes.object,
  },

  // Render

  render() {
    const { post } = this.props;
    const { valid } = this.state;
    const { user } = this.context;

    return (
      <Card className='ui basic segment'>
        <CardTitle title='Comentar' />
        <CardText>

          <div className='ui grid'>

            <div className='sixteen wide column'>
              <PublicContentCreate
                field='content'
                schema={Posts.ContentSchema}
                contentTypes={NoReferenceContentTypes}
                form={this}
              />
            </div>

            <div className='sixteen wide column'>
              {
                _.map(this.doc.get('content'), (s, i) =>
                  <div style={{ width: '100%' }} key={i} >
                    <PublicContentShow
                      schema={Posts.ContentSchema}
                      field='content'
                      form={this}
                      index={i}
                      doc={s}
                    />
                  </div>
                )
              }
            </div>

          </div>

        </CardText>
        <CardActions>
          <RaisedButton
            label='Commentar'
            disabled={!valid}
            secondary={true}
            onTouchTap={this.handleComment}
          />
        </CardActions>
      </Card>
    );
  },

});

export default StudentPostShowNewComment;

import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, Divider } from 'material-ui';
import { FlatButton, CardText, Chip } from 'material-ui';

const TeacherPostsCards = React.createClass({

  // Render

  render() {
    const { _posts, userId, _tags } = this.props;

    return !_posts.length
      ? null
      : (
      <div className='ui grid container' style={{ marginTop: 10 }}>
       {
         _.map(_posts, post =>
           <div
             className='sixteen wide mobile eight wide tablet five wide computer column'
             key={post._id}
           >
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
                           {_.get(_.find(_tags, { _id: t }), 'text')}
                         </Chip>
                       )
                     }
                   </div>
                 </div>

               </CardText>

               <CardActions>
                 <FlatButton
                   href={FlowRouter.path('TeacherPostShow', { postId: post._id })}
                   label='Ver'
                   primary={true}
                 />
                 {
                   userId !== post.get('author')
                   ? undefined
                   : <FlatButton
                     href={FlowRouter.path('TeacherPost', { postId: post._id })}
                     label='Editar'
                     secondary={true}
                   />
                 }
               </CardActions>
             </Card>
           </div>
         )
       }
     </div>
    );
  },
});

export default TeacherPostsCards;

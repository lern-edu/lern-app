import React from 'react';

StudentCourseShowPosts = React.createClass({

  // render

  render() {
    const { posts, images, documents, teachers, tags, subjects } = this.props;

    return (
      <div className='ui centered grid'>
        {_.map(_.clone(posts).reverse(), post => {
          return (
            <div className='sixteen wide mobile sixteen wide tablet eight wide computer column' key={post._id}>
              <StudentCourseShowPostsCard
              post={post}
              images={images}
              documents={documents}
              tags={tags}
              subjects={subjects}
              teacher={_.first(_.filter(teachers, t => t._id === post.author))}
              />
            </div>
          );
        })}
      </div>
    );
  },
});

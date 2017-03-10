// Libs
import React from 'react';

// Views
import StudentCourseShowPostsCard from './Card.jsx';

const StudentCourseShowPosts = React.createClass({

  // render

  render() {
    const { posts, images, documents, teachers, tags, subjects } = this.props;

    return (
      <div className='ui centered grid'>
        {_.map(_.clone(posts).reverse(), post =>
          <div
            key={post._id}
            className='sixteen wide mobile sixteen wide tablet eight wide computer column'
          >
            <StudentCourseShowPostsCard
            post={post}
            images={images}
            documents={documents}
            tags={tags}
            subjects={subjects}
            teacher={_.first(_.filter(teachers, t => t._id === post.author))}
            />
          </div>
        )}
      </div>
    );
  },
});

export default StudentCourseShowPosts;

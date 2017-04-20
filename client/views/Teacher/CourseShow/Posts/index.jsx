import React from 'react';

TeacherCourseShowPosts = React.createClass({

  // Initial state

  getInitialState() {
    return { onlyMy: false };
  },

  // Handlers

  handleChange(event) {
    this.setState({
      onlyMy: event.target.checked,
    });
  },

  // Render

  render() {
    const { posts, images, teachers, documents, course, tags, subjects, userId } = this.props;
    const { onlyMy } = this.state;

    let postsToShow = _.clone(posts);
    if (onlyMy)
      postsToShow = _.sortBy(
        _.filter(postsToShow, p => p.author === Meteor.userId()),
        p => moment(p.createdAt).format('L'));

    return (
      <div className='ui centered grid'>
        <div className='sixteen wide column'>
          <div className='ui centered slider checkbox'>
            <input name='newsletter' type='checkbox' onChange={this.handleChange} />
            <label style={{ width: '-moz-max-content' }}>Apenas meus posts</label>
          </div>
        </div>
        {_.map(_.reverse(postsToShow), post => {
          return (
            <div className='sixteen wide mobile sixteen wide tablet eight wide computer column' key={post._id}>
              <TeacherCourseShowPostsCard
              post={post}
              images={images}
              documents={documents}
              tags={tags}
              subjects={subjects}
              courseId={course._id}
              userId={userId}
              teacher={_.first(_.filter(teachers, t => t._id === post.author))}
              />
            </div>
          );
        })}
      </div>
    );
  },
});

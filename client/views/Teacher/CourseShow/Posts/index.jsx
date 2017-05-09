// Views
import React from 'react';

// Libs
import TeacherCourseShowPostsCard from './Card.jsx';

const TeacherCourseShowPosts = React.createClass({

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
    const { posts, course, userId } = this.props;
    const { onlyMy } = this.state;

    const postsToShow = !onlyMy
    ? posts
    : _.sortBy(
      _.filter(posts, { author: userId }),
      p => moment(p.createdAt).format('L')
    );

    return (
      <div className='ui grid container' style={{ marginTop: 10 }}>

        {
          _.map(
            _.reverse(postsToShow),
            post =>
              <TeacherCourseShowPostsCard
                key={post._id}
                post={post}
                {...this.props}
              />
          )
        }

      </div>
    );
  },
});

export default TeacherCourseShowPosts;

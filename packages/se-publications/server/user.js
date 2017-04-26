const [prefix, protect] = ['User'];

Helpers.Publications({ type: 'plain', prefix, protect }, {
  Data() {
    const { userId } = this;
    return Fetch.General.users(userId);
  },

  Schools() {
    const { userId } = this;
    const { profile: { schools, school } } = Meteor.users.findOne(userId) || {};
    return Fetch.General.users(_.union(schools, [school]));
  },
});

Helpers.Publications({ type: 'composite', prefix, protect }, {
  Post({ postId }={}, { users, course }={}) {
    const { userId } = this;
    return {
      find() {
        return Fetch.General.posts(postId);
      },

      children: [
        {
          find(post) {
            return course && post.findCourse();
          },
        }, {
          find(post) {
            return users && post.findUsers();
          },
        },
      ],
    };
  },

});

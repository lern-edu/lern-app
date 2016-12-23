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

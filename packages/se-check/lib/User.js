Check.User = function(userId) {
  let user = Fetch.General.users(userId);
  Check.Cursor(user).some();
  user = _.first(user.fetch());

  return {
    role(role) {
      if (!user.hasRole(role))
        throw new Meteor.Error('check.user.role: wrong-role');
    },
  };
};

const [prefix, protect] = ['User'];

Helpers.Methods({ prefix, protect }, {
  PostSave: Helpers.DefaultSave,
  SchoolSave({ school }) {
    const user = Meteor.user();
    user.set('profile.school', school);
    Helpers.DefaultSave(user);
  },

  UpdateProfileName(name) {
    const user = Meteor.user();
    user.set('profile.name', name);
    user.save();
  },

  UpdateProfileTutorial() {
    const user = Meteor.user();
    const val = user.get('profile.tutorial');
    user.set('profile.tutorial', !val);
    user.save();
  },

  Contact({ type, text }) {
    const user = Meteor.user();

    Check(type, Match.OneOf(...ContactTypes.all('keys')));
    Check(text, String);
    Check(text.length, Match.Where(l => l > 16));
    Check(user, Meteor.users.Schema);

    this.unblock();

    Email.send({
      from: Meteor.settings.emails.default,
      to: Meteor.settings.emails.dev,
      subject: `[${ContactTypes.getName(type)}] ${user.getEmail()}`,
      text: text,
    });
  },

  // TODO Verification of like or useless should made on astronomy, but I did this here...

  LikePost({ userId, postId }) {
    const post = Posts.findOne(postId);
    const useless = post.get('useless') || [];
    if (_.includes(useless, userId))
      return 'You already useless this post';
    const like = post.get('like') || [];
    _.includes(like, userId) ? _.pull(like, userId) : like.push(userId);
    post.set('like', like);
    post.save();
    return 'Like';
  },

  UselessPost({ userId, postId }) {
    const post = Posts.findOne(postId);
    const like = post.get('like') || [];
    if (_.includes(like, userId))
      return 'You already like this post';
    const useless = post.get('useless') || [];
    _.includes(useless, userId) ? _.pull(useless, userId) : useless.push(userId);
    post.set('useless', useless);
    post.save();
    return 'Useless';
  },
});

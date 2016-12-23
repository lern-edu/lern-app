Meteor.startup(function () {
  if (Meteor.isServer) {
    Future = Npm.require('fibers/future');
  };
});

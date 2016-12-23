Data = {
  mixins: [ReactMeteorData],

  /* Reactive Data Fetching
  */

  getMeteorData() {
    if (Meteor.userId())
      Meteor.subscribe('UserData');

    return {
      route: FlowRouter.getRouteName(),
      user: Meteor.user(),
      logging: Meteor.loggingIn(),
    };
  },

  /* Set Context
  */

  childContextTypes: {
    route: React.PropTypes.string.isRequired,
    user: React.PropTypes.object,
    logging: React.PropTypes.bool.isRequired,
  },

  getChildContext() {
    return this.data;
  },
};

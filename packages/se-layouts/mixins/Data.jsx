import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

Data = {
  /* Set Context
  */

  childContextTypes: {
    route: React.PropTypes.string.isRequired,
    user: React.PropTypes.object,
    logging: React.PropTypes.bool.isRequired,
  },

  getChildContext() {
    console.log(this.props);
    const { route, user, logging } = this.props;
    return { route, user, logging };
  },
};

export default LayoutContainer = createContainer(({ params }) => {
  if (Meteor.userId())
    Meteor.subscribe('UserData');

  return {
    route: FlowRouter.getRouteName(),
    user: Meteor.user(),
    logging: Meteor.loggingIn(),
  };
}, Layout);

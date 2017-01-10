import { mount } from 'react-mounter';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

const Render = {
  statics: {
    setup(args1) {
      return {
        render(args2) {
          const LayoutContainer = createContainer(({ params }) => {
            if (Meteor.userId())
              Meteor.subscribe('UserData');

            return {
              route: FlowRouter.getRouteName(),
              user: Meteor.user(),
              logging: Meteor.loggingIn(),
            };
          }, Layout);

          const props = _.assign({}, args1, args2);
          mount(LayoutContainer, props);
        },
      };
    },
  },
};

export default Render;

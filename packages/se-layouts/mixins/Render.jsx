import { mount } from 'react-mounter';

Render = {
  statics: {
    setup(args1) {
      return {
        render(args2) {
          const props = _.assign({}, args1, args2);
          mount(Layout, props);
        },
      };
    },
  },
};

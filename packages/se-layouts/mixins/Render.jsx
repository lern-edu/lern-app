import { mount } from 'react-mounter';

const Render = {
  statics: {
    setup(args1) {
      return {
        render(args2) {
          const props = _.assign({}, args1, args2);
          mount(LayoutContainer, props);
        },
      };
    },
  },
};

export default Render;

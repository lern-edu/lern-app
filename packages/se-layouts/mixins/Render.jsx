Render = {
  statics: {
    setup(args1) {
      return {
        render(args2) {
          const props = _.assign({}, args1, args2);
          ReactLayout.render(Layout, props);
        },
      };
    },
  },
};

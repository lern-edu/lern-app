Semantic.Transitions = React.addons.TransitionGroup;
Semantic.Transition = function (trans, { ref='animate' }={}) {
  const transitions =
      _.isString(trans) ? { appear: `${trans} in`, enter: `${trans} in`, leave: `${trans} out` }
    : _.isObject(trans) ? _.pick(trans, 'appear', 'enter', 'leave')
    : undefined;

  if (!transitions) throw new Meteor.Error('semantic.transition: invalid arg');

  function hide(done) {
    const $node = $(ReactDOM.findDOMNode(this.refs[ref]));
    $node.addClass('transition hidden');
    done();
  }

  function animate(key, done) {
    const $node = $(ReactDOM.findDOMNode(this.refs[ref]));
    $node.transition({ animation: key, onComplete: done });
  }

  const hooks = {};

  if (transitions.appear)
    _.assign(hooks, {
      componentWillAppear: hide,
      componentDidAppear: _.partial(animate, transitions.appear),
    });

  if (transitions.enter)
    _.assign(hooks, {
      componentWillEnter: hide,
      componentDidEnter: _.partial(animate, transitions.enter),
    });

  if (transitions.leave)
    _.assign(hooks, {
      componentWillLeave: _.partial(animate, transitions.leave),
    });

  return hooks;
};

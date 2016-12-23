Semantic.Progress = React.createClass({
  mixins: [
    TagWrapper({
      defaultTag: 'div',
      defaultClass: 'ui progress',
      ignoredProps: [],
      staticProps: { ref: 'progress' },
    }),
  ],

  componentDidMount() {
    const $node = $(ReactDOM.findDOMNode(this.refs.progress));
    $node.progress();
  },
});

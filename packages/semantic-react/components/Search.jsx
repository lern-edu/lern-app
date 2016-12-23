Semantic.Search = React.createClass({
  mixins: [
    TagWrapper({
      defaultTag: 'div',
      defaultClass: 'ui search',
      ignoredProps: ['source'],
      staticProps: { ref: 'search' },
    }),
  ],

  componentDidMount() {
    const { source } = this.props;
    const $node = $(ReactDOM.findDOMNode(this.refs.search));
    $node.search({ source });
  },
});

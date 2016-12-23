Semantic.Accordion = React.createClass({
  mixins: [
    TagWrapper({
      defaultTag: 'div',
      defaultClass: 'ui accordion',
      ignoredProps: ['onOpen'],
      staticProps: { ref: 'accordion' },
    }),
  ],

  componentDidMount() {
    const { onOpen } = this.props;
    const $node = $(ReactDOM.findDOMNode(this.refs.accordion));
    $node.accordion({ onOpen });
  },
});

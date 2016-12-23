Semantic.Popup = React.createClass({
  mixins: [
    TagWrapper({
      defaultTag: 'div',
      defaultClass: '',
      ignoredProps: ['target', 'parent'],
      staticProps: { ref: 'popupTarget' },
    }),
  ],

  componentDidMount() {
    const { target='popup', parent } = this.props;
    const $node = $(ReactDOM.findDOMNode(this.refs.popupTarget));
    $node.popup({ popup: ReactDOM.findDOMNode(parent.refs[target]) });
  },
});

Semantic.Button = React.createClass({
  mixins: [
    TagWrapper({
      defaultTag: 'div',
      defaultClass: 'ui button',
      ignoredProps: ['onClick'],
      staticProps: { onClick: null },
    }),
  ],

  handleClick(event) {
    const { onClick } = this.props;
    if (onClick) onClick(this.props, event);
  },
});

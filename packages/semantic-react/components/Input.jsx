Semantic.Input = React.createClass({
  mixins: [
    TagWrapper({
      defaultTag: 'input',
      defaultClass: '',
      ignoredProps: ['onInput'],
      staticProps: { onInput: null },
    }),
  ],

  handleInput(event) {
    const { onInput } = this.props;
    const value = $(event.target).val();
    if (onInput) onInput(value, this.props, event);
  },
});

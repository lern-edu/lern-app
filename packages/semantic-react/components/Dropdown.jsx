import PropTypes from 'prop-types';

Semantic.Dropdown = React.createClass({
  mixins: [
    TagWrapper({
      defaultTag: 'div',
      defaultClass: 'ui dropdown',
      ignoredProps: ['initial', 'settings', 'onChange'],
      staticProps: { ref: 'dropdown' },
    }),
  ],

  propTypes: {
    initial: PropTypes.node,
    settings: PropTypes.object,
    onChange: PropTypes.func,
  },

  componentDidMount() {
    const { settings={}, initial, onChange } = this.props;

    $(ReactDOM.findDOMNode(this.refs.dropdown))
      .dropdown({ onChange, ...settings })
      .dropdown('set selected', initial)
      ;
  },
});

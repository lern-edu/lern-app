TagWrapper = function({ defaultTag='div', defaultClass='', ignoredProps=[], staticProps={} }) {
  ignoredProps = _.union(['className', 'classes', 'tag'], ignoredProps);

  return {

    getFinalTag() {
      const { tag } = this.props;
      return tag || defaultTag;
    },

    getFinalClass() {
      const { className, classes='' } = this.props;
      return className || `${defaultClass} ${classes}`;
    },

    getFinalProps() {
      const fixed = _.mapValues(staticProps, (v, k) => _.isNull(v) && _.startsWith(k, 'on') ?  this[_.replace(k, 'on', 'handle')] : v);
      return _.assign(_.omit(this.props, ignoredProps), fixed);
    },

    render() {
      const Tag = this.getFinalTag();
      const classes = this.getFinalClass();
      const props = this.getFinalProps();

      return <Tag className={classes} {...props}>{this.props.children}</Tag>;
    },

  };
};

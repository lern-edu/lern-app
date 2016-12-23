Screen = {

  breakpoints: [
    { label: 'mobile', width: 320 },
    { label: 'tablet', width: 768 },
    { label: 'computer', width: 992 },
  ],

  /* Methods
  */

  getMediaQueries() {
    const { breakpoints: bps } = this;
    return _.map(bps, (bp, i) => (
        i === 0 ? `screen and (max-width: ${bp.width}px)`
      : i === bps.length - 1 ? `screen and (min-width: ${bp.width}px)`
      : `screen and (min-width: ${bps[i - 1].width}px) and (max-width: ${bp.width}px)`
    ));
  },

  /* Lifecycle
  */

  getInitialState() {
    return { screen: undefined };
  },

  componentDidMount() {
    this.queries = this.getMediaQueries();

    const { breakpoints: bps, queries } = this;
    _.forEach(queries, (query, i) =>
      enquire.register(query, () =>
        this.setState({ screen: bps[i].label })
      )
    );
  },

  componentWillUnmount() {
    const { queries } = this;
    _.forEach(queries, query =>
      enquire.unregister(query)
    );
  },

  /* Set Context
  */

  childContextTypes: {
    screen: React.PropTypes.string,
  },

  getChildContext() {
    return { screen: this.state.screen };
  },

};

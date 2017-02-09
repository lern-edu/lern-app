import React from 'react';

const Screen = {

  // Static

  breakpoints: [
    { label: 'mobile', width: 320 },
    { label: 'tablet', width: 768 },
    { label: 'computer', width: 992 },
  ],

  // Methods

  getMediaQueries() {
    const { breakpoints: bps } = this;
    return _.map(bps, (bp, i) => (
        i === 0 ? `screen and (max-width: ${bp.width}px)`
      : i === bps.length - 1 ? `screen and (min-width: ${bp.width}px)`
      : `screen and (min-width: ${bps[i - 1].width}px) and (max-width: ${bp.width}px)`
    ));
  },

  // Lifecycle

  getInitialState() {
    return {
      screen: undefined,
      innerHeight: window.innerHeight,
      innerWidth: window.innerWidth,
      queries: this.getMediaQueries(),
    };
  },

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    const { queries } = this.state;
    const { breakpoints: bps } = this;
    _.forEach(queries, (query, i) =>
      enquire.register(query, () => this.setState({ screen: bps[i].label }))
    );
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    const { queries } = this.state;
    _.forEach(queries, query =>
      enquire.unregister(query)
    );
  },

  // handlers

  handleResize(e) {
    this.setState({ innerHeight: window.innerHeight, innerWidth: window.innerWidth });
  },

  // Set Context

  getChildContext() {
    return {
      screen: this.state.screen,
      innerHeight: this.state.innerHeight,
      innerWidth: this.state.innerWidth,
    };
  },

};

export default Screen;

Screen = {

  // Lifecycle

  getInitialState() {
    return {
      innerHeight: window.innerHeight,
      innerWidth: window.innerWidth,
    };
  },

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },

  // handlers

  handleResize(e) {
    this.setState({ innerHeight: window.innerHeight, innerWidth: window.innerWidth });
  },

};

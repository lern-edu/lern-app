Layout = React.createClass({
  mixins: [
    Data,
    Render,
    Screen,
    Theme,
  ],

  propTypes: {
    nav: React.PropTypes.bool,
    bar: React.PropTypes.bool,
    protect: React.PropTypes.string,
  },

  /* Render
  */

  render() {
    const stuff = {
      ...this.props,
      ...this.data,
      ...this.state,
    };

    return (
      <div>

        <nav>
          {!stuff.nav ? undefined : <LayoutNavigation {...stuff}/>}
        </nav>

        <main style={{ paddingTop: stuff.bar ? 64 : 0 }}>
          <LayoutSafe {...stuff}>
            {this.props.main}
          </LayoutSafe>
        </main>

        <footer style={{ marginLeft: stuff.nav &&
            stuff.screen === 'computer' ? 256 : 0, }}>
          <LayoutFooter />
        </footer>

        <aside>
          <LayoutSnackbar />
        </aside>

      </div>
    );
  },
});

import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// Components
import LayoutSnackbar from './components/Snackbar.jsx';
import LayoutNavigation from './components/Navigation.jsx';
import LayoutSafe from './components/Safe.jsx';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#2196F3',
    primary2Color: '#1976D2',
    primary3Color: '#BBDEFB',
    accent1Color: '#FFC107',
  },
});

Layout = React.createClass({
  mixins: [Data, Render, Screen],

  /* Render
  */

  render() {
    const stuff = {
      ...this.props,
      ...this.data,
      ...this.state,
    };

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
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
      </MuiThemeProvider>
    );
  },
});

Layout.propTypes = {
  nav: React.PropTypes.bool,
  bar: React.PropTypes.bool,
  protect: React.PropTypes.string,
};

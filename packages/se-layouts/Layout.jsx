import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


// Components
import Navigation from './components/Navigation.jsx';
import Snackbar from './components/Snackbar.jsx';
import Footer from './components/Footer.jsx';
import Safe from './components/Safe.jsx';

// mixins
import Language from './mixins/Language.jsx';
import Screen from './mixins/Screen.jsx';
import Render from './mixins/Render.jsx';
import Data from './mixins/Data.jsx';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#2196F3',
    primary2Color: '#1976D2',
    primary3Color: '#BBDEFB',
    accent1Color: '#FFC107',
  },
});

Layout = React.createClass({
  mixins: [Data, Render, Screen, Language],

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
            {!stuff.nav ? undefined : <Navigation {...stuff}/>}
          </nav>

          <main style={{ paddingTop: stuff.bar ? 64 : 0 }}>
            <Safe {...stuff}> {this.props.main} </Safe>
          </main>

          <footer style={{ marginLeft: stuff.nav && stuff.screen === 'computer' ? 256 : 0 }}>
            <Footer />
          </footer>

          <aside>
            <Snackbar />
          </aside>

        </div>
      </MuiThemeProvider>
    );
  },
});

Layout.childContextTypes = {
  route: React.PropTypes.string.isRequired,
  logging: React.PropTypes.bool.isRequired,
  innerHeight: React.PropTypes.number,
  innerWidth: React.PropTypes.number,
  screen: React.PropTypes.string,
  user: React.PropTypes.object,
};

Layout.propTypes = {
  route: React.PropTypes.string.isRequired,
  logging: React.PropTypes.bool.isRequired,
  innerHeight: React.PropTypes.number,
  innerWidth: React.PropTypes.number,
  protect: React.PropTypes.string,
  screen: React.PropTypes.string,
  user: React.PropTypes.object,
  nav: React.PropTypes.bool,
  bar: React.PropTypes.bool,
};

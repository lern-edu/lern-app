// Libs
import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Components
import Navigation from './components/Navigation.jsx';
import Snackbar from './components/Snackbar.jsx';
import Footer from './components/Footer.jsx';
import Safe from './components/Safe.jsx';

// Mixins
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
  mixins: [Data, Render, Language],

  /* Render
  */

  render() {
    const stuff = {
      ...this.props,
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

          {/* <footer style={{ marginLeft: stuff.nav && stuff.screen === 'computer' ? 256 : 0 }}>
            <Footer />
          </footer> */}

          <aside>
            <Snackbar />
          </aside>

        </div>
      </MuiThemeProvider>
    );
  },
});

Layout.childContextTypes = {
  route: PropTypes.string.isRequired,
  logging: PropTypes.bool.isRequired,
  user: PropTypes.object,
};

Layout.propTypes = {
  route: PropTypes.string.isRequired,
  logging: PropTypes.bool.isRequired,
  protect: PropTypes.string,
  user: PropTypes.object,
  nav: PropTypes.bool,
  bar: PropTypes.bool,
};

LayoutContainer = createContainer(({ params }) => {
  if (Meteor.userId())
    Meteor.subscribe('UserData');

  return {
    route: FlowRouter.getRouteName(),
    user: Meteor.user(),
    logging: Meteor.loggingIn(),
  };
}, Layout);

// Libs
import React from 'react';
import { Tabs, Tab, Paper } from 'material-ui';

// Views
import PublicLoginEnter from './Enter.jsx';

PublicLoginView = React.createClass({

  // Lifecycle

  getInitialState() {
    return { tab: 'enter' };
  },

  // Styles

  styles: {
    form: {
      className: 'eight wide computer ten wide tablet thirteen wide mobile column',
      style: {
        marginTop: '7%',
        padding: '0px',
      },
      zDepth: 4,
    },
    background: {
      style: {
        width: `100%`,
        height: `100%`,
        top: 0,
        left: 0,
        backgroundSize: 'cover',
        backgroundImage: 'url(/images/login/classroom.jpg)',
        backgroundRepeat: 'round',
        opacity: '0.5',
        position: 'fixed',
        zIndex: '-1',
      },
    },
  },

  // Handlers

  handleTabChange(tab) {
    this.setState({ tab });
  },

  // render

  render() {
    const { tab } = this.state;
    const { background, form } = this.styles;

    return (
      <div className='ui middle aligned center aligned grid'
        style= {{ marginTop: '0px' }}>
        <div {...background} />

        <Paper {...form}>
              <PublicLoginEnter {...this.props} />
        </Paper>

      </div>
    );
  },
});

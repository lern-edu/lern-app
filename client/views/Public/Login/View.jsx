import React from 'react';
import { Tabs, Tab, Paper } from 'material-ui';
import lodash from 'lodash';
_ = lodash;

import PublicLoginEnter from './Enter.jsx';
import PublicLoginRegister from './Register.jsx';

PublicLoginView = React.createClass({

  // Lifecycle

  getInitialState() {
    return { tab: 'enter' };
  },

  contextTypes: {
    innerHeight: React.PropTypes.number,
    innerWidth: React.PropTypes.number,
  },

  // Styles

  createStyles() {
    const { context } = this;
    return {
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
          width: `${context.innerWidth}px`,
          height: `${context.innerHeight}px`,
          backgroundSize: 'cover',
          backgroundImage: 'url(/images/login/classroom.jpg)',
          backgroundRepeat: 'round',
          opacity: '0.5',
          position: 'fixed',
          zIndex: '-1',
        },
      },
    };
  },

  // Handlers

  handleTabChange(tab) {
    this.setState({ tab });
  },

  // render

  render() {
    const { state: { tab } } = this;
    const styles = this.createStyles();

    return (
      <div className='ui middle aligned center aligned grid'
        style= {{ marginTop: '0px' }}>
        <div {...styles.background} />

        <Paper {...styles.form}>
          <Tabs value={tab} onChange={this.handleTabChange}>
            <Tab label='Entrar' value='enter' >
              <PublicLoginEnter />
            </Tab>
            <Tab label='Cadastrar' value='register' >
              <PublicLoginRegister />
            </Tab>
          </Tabs>

        </Paper>

      </div>
    );
  },
});

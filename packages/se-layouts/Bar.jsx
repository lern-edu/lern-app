import React from 'react';
import { AppBar } from 'material-ui';

Layout.Bar = React.createClass({
  propTypes: {
    crumbs: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        label: React.PropTypes.string,
        path: React.PropTypes.string,
      })),
  },

  /* Get Context
  */

  contextTypes: {
    screen: React.PropTypes.string,
  },

  /* Methods
  */

  getTitle({ title, screen, crumbs }) {
    if (screen !== 'computer') return title;

    return (
      <span>
        {_.flatten(_.map(crumbs, (c, i) => [
          <span key={`crumb${i}`} onClick={()=>FlowRouter.go(c.path)} style={{ cursor: 'pointer' }}>{c.label}</span>,
          <span key={`sep${i}`} style={{ marginLeft: 5, marginRight: 5 }}>/</span>,
        ]))}
        <span>{title}</span>
      </span>
    );
  },

  /* Render
  */

  render() {
    const { screen } = this.context;
    const { crumbs, title } = this.props;

    return (
      <AppBar
        {..._.omit(this.props, ['crumbs'])}
        title={this.getTitle({ title, screen, crumbs })}
        showMenuIconButton={true}
        onLeftIconButtonTouchTap={window.nav}
        style={{ position: 'fixed', top: 0, left: 0 }}
      />
    );
  },
});

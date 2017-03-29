import React from 'react';
import { AppBar, FlatButton, IconButton, FontIcon } from 'material-ui';
import { Avatar, MenuItem, IconMenu, Divider } from 'material-ui';

Layout.Bar = React.createClass({
  propTypes: {
    crumbs: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        label: React.PropTypes.string,
        path: React.PropTypes.string,
      })),
  },

  /* Methods
  */

  getTitle({ title, crumbs }) {

    return (
      <div>
        <span>
          {
            _.flatten(
              _.map(crumbs, (c, i) =>
                [
                  <span key={`crumb${i}`}
                    onClick={()=>FlowRouter.go(c.path)}
                    style={{ cursor: 'pointer' }}>
                    {c.label}
                  </span>,
                  <span
                    key={`sep${i}`}
                    style={{ marginLeft: 5, marginRight: 5 }}>
                    /
                  </span>,
                ]
              )
            )
          }

        </span>
        <span>{title}</span>
      </div>
    );
  },

  /* Render
  */

  render() {
    const { crumbs, title, disableActions } = this.props;

    return (
      <AppBar
        {..._.omit(this.props, ['crumbs', 'disableActions'])}
        title={this.getTitle({ title, crumbs })}
        showMenuIconButton={true}
        onLeftIconButtonTouchTap={disableActions ? () => false : window.nav}
        style={{ position: 'fixed', top: 0, left: 0 }}
      />
    );
  },
});

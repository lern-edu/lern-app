import React from 'react';
import { AppBar, FlatButton, IconButton, FontIcon } from 'material-ui';
import { Avatar, MenuItem, IconMenu, Divider } from 'material-ui';

const Settings = React.createClass({

  /* Get Context
  */

  contextTypes: {
    user: React.PropTypes.object,
  },

  render() {
    const { user } = this.context;
    const { disableActions } = this.props;
    const profilePic = _.get(user, 'profile.profilePic');
    const name = _.get(user, 'profile.name');

    return (
      !user ? <FlatButton href={FlowRouter.path('PublicLogin')} label='Login' /> :
      <IconMenu {..._.omit(this.props, ['disableActions'])}
        iconButtonElement={
          <IconButton>{profilePic ? <Avatar src={profilePic} /> :
            <Avatar size={32}>{_.first(name)}</Avatar>}</IconButton>}
        targetOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }} >
        <MenuItem primaryText={name} disabled={true} />
        <Divider />
        {disableActions ? undefined : <MenuItem
          primaryText='Configurações'
          leftIcon={<FontIcon className='material-icons' >settings</FontIcon>}
          onClick={event => event.stopPropagation() ||
            FlowRouter.go(user.getSettingsRoute())} />}
        <MenuItem
          primaryText='Fale conosco'
          leftIcon={<FontIcon className='material-icons' >email</FontIcon>}
          onClick={event => event.stopPropagation() ||
            FlowRouter.go('PublicContact')} />
        <MenuItem
          primaryText='Sair'
          leftIcon={<FontIcon className='material-icons' >close</FontIcon>}
          onClick={event => event.stopPropagation() || Meteor.logout()} />
      </IconMenu>
    );
  },
});

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
          <span key={`crumb${i}`}
            onClick={()=>FlowRouter.go(c.path)}
            style={{ cursor: 'pointer' }}>{c.label}</span>,
          <span
            key={`sep${i}`}
            style={{ marginLeft: 5, marginRight: 5 }}>/</span>,
        ]))}
        <span>{title}</span>
      </span>
    );
  },

  /* Render
  */

  render() {
    const { screen } = this.context;
    const { crumbs, title, disableActions } = this.props;

    return (
      <AppBar
        {..._.omit(this.props, ['crumbs', 'disableActions'])}
        title={this.getTitle({ title, screen, crumbs })}
        showMenuIconButton={true}
        onLeftIconButtonTouchTap={disableActions ? () => false : window.nav}
        iconElementRight={<Settings disableActions={disableActions} />}
        style={{ position: 'fixed', top: 0, left: 0 }}
      />
    );
  },
});

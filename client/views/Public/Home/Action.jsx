import React from 'react';
import { RaisedButton, FontIcon, AppBar, FlatButton } from 'material-ui';;

const PublicHomeAction = React.createClass({

  // Context

  contextTypes: {
    user: React.PropTypes.object,
  },

  /* Handlers
  */

  handleClick() {

  },

  /* Render
  */

  render() {
    const { user } = this.context;

    return (
      <div style={{ position: 'fixed', top: 0, right: 0, zIndex: 2, margin: 0, width: '100%' }}>
        <AppBar
          title='Lern - Soluções Educacionais'
          showMenuIconButton={false}
          iconElementRight={
            user ? (
              <FlatButton
                label={`Olá ${user.getName()}`}
                href={FlowRouter.path(user.getHomeRoute())}
                icon={
                  <FontIcon className='material-icons'>
                    exit_to_app
                  </FontIcon>
                }
              />
            ) : (
              <FlatButton
                onClick={this.handleClick}
                href={FlowRouter.path('PublicLogin')}
                label={'Acessar sua conta'} />
            )
          }
        />
      </div>
    );
  },
});

export default PublicHomeAction;

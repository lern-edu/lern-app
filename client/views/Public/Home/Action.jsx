import React from 'react';
import { FloatingActionButton, RaisedButton, FontIcon } from 'material-ui';;

PublicHomeAction = React.createClass({

  /* Handlers
  */

  handleClick() {

  },

  /* Render
  */

  render() {
    const { user } = this.props;

    return (
      <div style={{ position: 'fixed', top: 0, right: 0, zIndex: 2, margin: 20 }}>
        {
          user ? (
            <RaisedButton
              primary={true}
              label={`Olá ${user.getName()}`}
              linkButton={true}
              href={FlowRouter.path(user.getHomeRoute())}
              icon={
                <FontIcon className='material-icons'>
                  exit_to_app
                </FontIcon>
              }
            />
          ) : (
            <RaisedButton primary={true}
              onClick={this.handleClick}
              linkButton={true}
              href={FlowRouter.path('PublicLogin')}
              label={'Acessar sua conta'} />
          )
        }
      </div>
    );
  },
});

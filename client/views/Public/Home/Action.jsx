import React from 'react';
import PropTypes from 'prop-types';
import { RaisedButton, FontIcon, AppBar, FlatButton } from 'material-ui';;

class PublicHomeAction extends React.Component {

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
  }
};

PublicHomeAction.contextTypes = {
  user: PropTypes.object,
};

export default PublicHomeAction;

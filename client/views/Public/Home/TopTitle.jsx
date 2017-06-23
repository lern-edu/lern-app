// Libs
import React from 'react';
import PropTypes from 'prop-types';
import { Paper, TextField, RaisedButton, Divider } from 'material-ui';
import { FloatingActionButton, FontIcon } from 'material-ui';
import { ScreenNew } from 'meteor/lsunsi:se-layouts';

// Views
import PublicHomeSocial from './Login/Social.jsx';
import PublicHomeAuthentication from './Login/mixins/Authentication.jsx';
import PublicHomeForgot from './Login/Forgot.jsx';
import PublicHomeRegister from './Login/Register.jsx';

// styles

const column = {
  className: 'sixteen wide column',
  style: { paddingBottom: '0px' },
};

const floatingButton = {
  className: 'ui right aligned basic segment',
  style: { position: 'absolute', bottom: '1em', right: '1em', zIndex: '1000' },
};

class CommonContent extends React.Component {

  constructor(props) {
    super(props);
    this.state = { password: false, register: false };
  }

  handlePasswordChange() {
    const { password } = this.state;
    this.setState({ password: !password });
  }

  handleRegisterChange() {
    const { register } = this.state;
    this.setState({ register: !register });
  }

  handleDown() {
    const { innerHeight } = this.props;
    $('html, body').animate({
      scrollTop: innerHeight,
    }, 'slow');
  }

  render () {
    const { authentication } = this.props;
    const { password, register } = this.state;
    const { user } = this.context;
    const texts = {
      emailMessage: i18n.__('PublicLoginEnter.emailMessage'),
      noAccount: i18n.__('PublicLoginEnter.noAccount'),
      register: i18n.__('PublicLoginEnter.register'),
      forgotPassword: i18n.__('PublicLoginEnter.forgotPassword'),
    };
    return (
      <div className={this.props.className} >

        <div className='computer only sixteen wide column' style={{ paddingBottom: '0px' }} >
          <img
            style={{ width: '16%' }}
            src='/images/icons/web_hi_res_512.png' />
        </div>

        <div
          className='mobile only tablet only sixteen wide column'
          style={{ paddingBottom: '0px' }}
        >
          <img
            style={{ width: '24%' }}
            src='/images/icons/web_hi_res_512.png' />
        </div>

        <div {...column} >
          <div
            className='ui text container'
            style={{ lineHeight: '1.5', textShadow: '0 0 10px rgba(0,0,0,.85)' }}
          >
            <h4 className='ui inverted header' style={{ fontSize: 26 }}>
              Um novo mundo de competências
            </h4>
          </div>
        </div>

        {
          user
          ? [
            <div {...column} key='hello'>
              <div
                className='ui text container'
                style={{ lineHeight: '1.5', textShadow: '0 0 10px rgba(0,0,0,.85)' }}
              >
                <h4 className='ui inverted header' style={{ fontSize: 26 }}>
                  Olá {_.get(user, 'profile.name')}
                </h4>
              </div>
            </div>,
            <div {...column} key='enter'>
              <RaisedButton
                label='Entrar'
                href={FlowRouter.path(user.getHomeRoute())}
                secondary={true}
              />
            </div>,
          ]
          : [
            <div className='sixteen wide column' key='social'>
              <PublicHomeSocial />
            </div>,
            <Paper
              key='email'
              className='eleven wide mobile seven wide tablet six wide computer column'
              style={{ paddingTop: 0 }}
              zDepth={3}
            >
              <TextField
                floatingLabelText='E-mail'
                value={authentication.state.email}
                name='email'
                type='email'
                onInput={authentication.handleInput.bind(authentication)}
                onKeyDown={authentication.handlePressEnter.bind(authentication)}
              />
              <br/>
              <TextField
                floatingLabelText='Senha'
                value={authentication.state.password}
                type='password'
                name='password'
                onInput={authentication.handleInput.bind(authentication)}
                onKeyDown={authentication.handlePressEnter.bind(authentication)}
              />
              <br/>
              <RaisedButton
                label='Entrar'
                primary={true}
                onClick={authentication.handleLogin.bind(authentication)}
              />

              <div {...column} style={{ marginBottom: '15px' }} >
                <div style={{ cursor: 'pointer',
                  color: 'blue',
                  marginTop: '20px', }}
                  onTouchTap={this.handlePasswordChange.bind(this)} >
                  <h5>{texts.forgotPassword}</h5>
                </div>
                <div style={{ cursor: 'pointer',
                  color: 'blue',
                  marginTop: '20px', }}
                  onTouchTap={this.handleRegisterChange.bind(this)} >
                  <h5>{texts.register}</h5>
                </div>
                <PublicHomeForgot
                  open={password}
                  handleClose={this.handlePasswordChange.bind(this)}
                />
                <PublicHomeRegister
                  open={register}
                  doc={new Meteor.users.FormSchema({ role: 'student' })}
                  handleClose={this.handleRegisterChange.bind(this)}
                />
              </div>
            </Paper>,
          ]
        }
        <div {...floatingButton}>
          <FloatingActionButton
            children={<FontIcon className='material-icons'>arrow_downward</FontIcon>}
            onTouchTap={this.handleDown.bind(this)}
          />
        </div>
      </div>
    );
  }
};

CommonContent.contextTypes = {
  user: PropTypes.object,
};

const styles = {
  bgParallax: {
    background: 'url(\'/images/home/lamp.jpg\') no-repeat left top',
    backgroundSize: 'cover',
  },
};

const CommonContentWithAuth = PublicHomeAuthentication(CommonContent);

class PublicHomeTopTitle extends React.Component {

  render() {
    const { bgParallax } = styles;
    const { innerHeight } = this.props;

    return (
      <div data-speed='2' style={_.assign(bgParallax, { height: innerHeight })}>

        <CommonContentWithAuth innerHeight={innerHeight} className='ui grid center aligned fluid' />

      </div>
    );
  }
};

export default ScreenNew(PublicHomeTopTitle);

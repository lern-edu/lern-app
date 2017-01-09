import React from 'react';
import { Drawer, CardMedia, ListItem } from 'material-ui';
import { RaisedButton, IconButton, Avatar } from 'material-ui';
import { Divider, LinearProgress, FontIcon, Styles } from 'material-ui';
import { grey300, grey400 } from 'material-ui/styles/colors';

LayoutNavigation = React.createClass({

  getInitialState() {
    return {
      routes: {
        admin: {
          AdminHome: {
            label: 'Home',
            icon: null,
          },
          AdminPlans: {
            label: 'Planos',
            icon: null,
          },
          AdminTests: {
            label: 'Provas',
            icon: null,
          },
          AdminContent: {
            label: 'Conteúdo',
            icon: null,
          },
          AdminSchools: {
            label: 'Escolas',
            icon: null,
          },
          AdminUsers: {
            label: 'Usuários',
            icon: null,
          },
        },
        school: {

        },
        teacher: {
          TeacherCourses: {
            label: 'Disciplinas',
            icon: 'dashboard',
          },
          TeacherQuestions: {
            label: 'Questões',
            icon: 'speaker_notes',
          },
          // TeacherTests: {
          //   label: 'Testes',
          //   icon: 'description',
          // },
          TeacherPosts: {
            label: 'Comunidade acadêmica',
            icon: 'forum',
          },
        },
        student: {
          StudentCourses: {
            label: 'Disciplinas',
            icon: 'dashboard',
          },
          StudentTests: {
            label: 'Estudos',
            icon: 'import_contacts',
          },
          StudentReports: {
            label: 'Relatórios',
            icon: 'timeline',
          },
          StudentPosts: {
            label: 'Comunidade acadêmica',
            icon: 'forum',
          },
        },
      },
    };
  },

  /* Methods
  */

  updateState({ screen }) {
    const { routes } = this.state;

    // const { user } = this.props;
    const isComputer = screen === 'computer';

    // if (_.get(user, 'profile.school')) {
    //   routes.teacher.TeacherCourses = 'Disciplinas';
    //   routes.student.StudentCourses = 'Disciplinas';
    // };

    this.setState({ routes,
      docked: false,
      open: false,
      style: {
        backgroundColor: '#F9F9F9',
      },
    });
  },

  /* Lifecycle
  */

  componentWillMount() {
    this.updateState(this.props);
    if (window) {
      if (window.nav) throw new Meteor.Error('Nav already initialized');
      else window.nav = (open=true) => this.setState({ open });
    }
  },

  componentWillReceiveProps(props) {
    this.updateState(props);
  },

  componentWillUnmount() {
    if (window) {
      if (window.nav) window.nav = null;
      else throw new Meteor.Error('Nav already removed');
    }
  },

  /* Render
  */

  render() {
    const { user, logging, route } = this.props;
    const { routes } = this.state;
    const logout = () => Meteor.logout();

    return (
      <Drawer {...this.state} onRequestChange={open => this.setState({ open })}>

        {!user ? (
          <div className='ui center aligned basic segment'>
            {logging ? <div/> :
              <div>
                <RaisedButton
                  href={FlowRouter.path('PublicLogin')}
                  label='Entrar'
                  primary={true}
                />
                <h1 className='ui icon header'>
                  <FontIcon
                    className='material-icons'
                    style={{ fontSize: 50 }}
                    color={grey300}>school</FontIcon>
                  <div className='content'>
                    <div className='sub header' style={{ color: grey400 }}>
                    </div>
                  </div>
                </h1>
              </div>
            }
          </div>
        ) : (
          <div>
            <ListItem
              primaryText={user.getName() || '(no name)'}
              onClick={() => FlowRouter.go(user.getHomeRoute())}
              rightIconButton={
                <IconButton
                  onClick={event => event.stopPropagation() ||
                    FlowRouter.go(user.getSettingsRoute())}
                  tooltip='Ajustes'
                  tooltipPosition='bottom-left'
                  touch={true}
                >
                  <FontIcon
                    className='material-icons'
                    color={grey300}>settings</FontIcon>
                </IconButton>
              }
            />
            <Divider/>
            {_.map(routes[user.getRole()], ({ label, icon }, _route) =>
              (_.get(user, 'profile.school') || !_route.includes('Courses')) ?
              <ListItem
                leftIcon={_.isNull(icon) ? undefined :
                  <FontIcon className='material-icons'>{icon}</FontIcon>}
                style={_route === route ? { backgroundColor: grey300 }
                  : undefined}
                key={_route}
                primaryText={label}
                href={FlowRouter.path(_route)}
              /> : undefined
            )}
            <Divider/>
            <div>
              <IconButton
                onClick={logout}
                tooltip='Sair'
                tooltipPosition='bottom-right'
                touch={true}
                style={{ float: 'left' }} >
                <FontIcon
                  className='material-icons'
                  color={grey300}>exit_to_app</FontIcon>
              </IconButton>
              <IconButton
                href={FlowRouter.path('PublicContact')}
                tooltip='Contato'
                tooltipPosition='bottom-left'
                touch={true}
                style={{ float: 'right' }}
              >
                <FontIcon
                  className='material-icons'
                  color={grey300}>mail_outline</FontIcon>
              </IconButton>
            </div>
          </div>
        )}

      </Drawer>
    );
  },
});

export default LayoutNavigation;

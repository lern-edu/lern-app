import React from 'react';
import { Drawer, CardMedia, ListItem } from 'material-ui';
import { RaisedButton, IconButton, Avatar } from 'material-ui';
import { Divider, LinearProgress, FontIcon, Styles } from 'material-ui';
import { grey300, grey400 } from 'material-ui/styles/colors';

const Navigation = React.createClass({

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
          SchoolHome: {
            label: 'Home',
            icon: 'home',
          },
          SchoolCourses: {
            label: 'Cursos',
            icon: 'dashboard',
          },
          SchoolUsers: {
            label: 'Alunos',
            icon: 'school',
          },
        },
        teacher: {
          TeacherHome: {
            label: 'Home',
            icon: 'home',
          },
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
          StudentHome: {
            label: 'Home',
            icon: 'home',
          },
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
    const { routes, open } = this.state;
    const logout = () => Meteor.logout();

    return (
      <Drawer {..._.omit(this.state, ['open'])} open={!open ? false : true}
        onRequestChange={open => this.setState({ open })}>

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
            <Divider/>
            {_.map(routes[user.getRole()], ({ label, icon }, _route) =>
              <ListItem
                leftIcon={_.isNull(icon) ? undefined :
                  <FontIcon className='material-icons'>{icon}</FontIcon>}
                style={_route === route ? { backgroundColor: grey300 }
                  : undefined}
                key={_route}
                primaryText={label}
                href={FlowRouter.path(_route)}
              />
            )}
            <Divider/>
            <div>
              <ListItem
                primaryText="Configurações"
                href={FlowRouter.path(user.getSettingsRoute())} />
              <ListItem
                primaryText="Fale conosco"
                href={FlowRouter.path('PublicContact')} />
              <ListItem
                primaryText="Sair"
                onClick={logout} />
            </div>
          </div>
        )}

      </Drawer>
    );
  },
});

export default Navigation;

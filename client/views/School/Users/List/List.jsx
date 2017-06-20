import React from 'react';
import PropTypes from 'prop-types';
import { Paper, List, ListItem } from 'material-ui';
import { grey400 } from 'material-ui/styles/colors';
import { FontIcon, IconMenu, IconButton, MenuItem } from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const SchoolUsersListView = React.createClass({

  // Static

  options: [
    {
      name: 'Eleger como professor',
      icon: 'supervisor_account',
      func(id) { this.handleSetTeacher(id); },
    },
    {
      name: 'Remover',
      icon: 'delete',
      func: (id) => { this.handleUserRemove(id); },
    },
  ],

  // Context

  contextTypes: {
    user: PropTypes.object,
  },

  // handlers

  handleUserRemove(userId) {
    Meteor.call('SchoolUserRemove', userId, (err) =>
    {
      if (err) snack('Problemas ao remover o aluno');
      else snack('Aluno removido');
    });
  },

  handleSetTeacher(userId) {
    Meteor.call('SchoolSetTeacher', userId, (err) => {
      if (err) {
        console.error(err);
        snack('Problemas ao eleger professor');
      } else {
        const { users } = this.props;
        const name = _.get(
          _.find(users, { _id: userId }),
          'profile.name'
        );
        snack(`Agora ${name} é um professor`);
      };
    });
  },

  // Render

  render() {
    const { users, filter: { name: nameFilter } } = this.props;
    const { user } = this.context;

    const filteredUsers = _.filter(
      users,
      ({ profile: { name }, emails }) =>
        _.isEmpty(nameFilter)
        || _.lowerCase(_.deburr(name)).includes(_.lowerCase(_.deburr(nameFilter)))
        || _.includes(_.map(emails, 'address'), _.lowerCase(_.deburr(nameFilter)))
    );

    return (
      <Paper className='ui vertical basic segment'>
        <List>
          {
            _.map(filteredUsers, ({ profile: { name }, _id, roles }) =>
             <ListItem
              key={_id}
              data-key={_id}
              primaryText={name}
              secondaryText={
                _.join(
                  _.map(roles, r => i18n.__(`UserRoles.${r}`)),
                  ', '
                )
              }
              rightIconButton={
                 <IconMenu
                   iconButtonElement={
                     <IconButton
                       touch={true}
                       tooltip='Mais'
                       tooltipPosition="bottom-left"
                     >
                       <MoreVertIcon color={grey400} />
                     </IconButton>
                   }
                 >
                   {
                     _.map(this.options, ({ name, func, icon }) =>
                       <MenuItem
                         key={name}
                         rightIcon={
                           <FontIcon className='material-icons'>
                             {icon}
                           </FontIcon>
                         }
                         onTouchTap={_.bind(func, this, _id)}
                        >
                         {name}
                       </MenuItem>
                     )
                   }
                 </IconMenu>
               }
             />
            )
         }
        </List>
      </Paper>
    );
  },
});

export default SchoolUsersListView;

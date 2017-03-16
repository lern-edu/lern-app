import React from 'react';
import { Paper, List, ListItem } from 'material-ui';
import { FontIcon } from 'material-ui';

const SchoolUsersListView = React.createClass({

  contextTypes: {
    user: React.PropTypes.object,
  },

  handleUserRemove(userId) {
    Meteor.call('SchoolUserRemove', userId, (err) =>
    {
      if (err) snack('Problemas ao remover o aluno');
      else snack('Aluno removido');
    });
  },

  render() {
    const { form, done, errors, teachers, students } = this.props;
    const { user } = this.context;
    return (
      <Paper className='ui vertical basic segment'>
        <List>
          {_.map(students, ({ profile: { name }, _id }) =>
           <ListItem
            key={_id}
            data-key={_id}
            primaryText={name}
            rightIcon={<FontIcon
            onTouchTap={() => this.handleUserRemove(_id)}
            className='material-icons'>delete</FontIcon>}
           />
         )}
        </List>
      </Paper>
    );
  },
});

export default SchoolUsersListView;

import React from 'react';
import { Paper, List, ListItem } from 'material-ui';
import { FontIcon } from 'material-ui';

const SchoolUsersList = React.createClass({

  handleUserRemove({ currentTarget }) {
    let { doc: { profile } } = this;
    _.pull(profile.schools, currentTarget.getAttribute('data-key'));
    this.defaultHandler({ profile }, { doc: true });
  },

  render() {
    const { state: { group }, props: { courses, users, query } } = this;

    return (
      <Paper className='ui vertical basic segment'>
        <List>
           <ListItem
            key={_id}
            data-key={_id}
            primaryText={name}
            rightIcon={<FontIcon
              onTouchTap={this.handleUserRemove}
              className='material-icons'>delete</FontIcon>}
           />
        </List>
      </Paper>
    );
  },
});

export default SchoolUsersList;

import React from 'react';
import { Paper, List, ListItem } from 'material-ui';

const SchoolUsersList = React.createClass({
  render() {
    const { courses } = this.props;

    return (
      <Paper className='ui vertical basic segment'>
        <List>
         {_.map(courses, ({ _id, name }) =>
           <ListItem
            key={schoolId}
            primaryText={name} />
         )}
        </List>
      </Paper>
    );
  },
});

export default SchoolUsersList;

import React from 'react';
import { Paper, List, ListItem } from 'material-ui';

const SchoolCoursesList = React.createClass({
  render() {
    const { courses } = this.props;

    return (
      <Paper className='ui vertical basic segment'>
        <List>
         {_.map(courses, ({ _id, name, alias }) =>
           <ListItem
            key={_id}
            primaryText={name}
            secondaryText={<p>Chave de acesso: <b>{alias}</b></p>}/>
         )}
        </List>
      </Paper>
    );
  },
});

export default SchoolCoursesList;

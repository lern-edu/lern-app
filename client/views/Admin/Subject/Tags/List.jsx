// Libs
import React from 'react';
import { List, ListItem, Paper } from 'material-ui';

const AdminSubjectsTagsList = React.createClass({

  /* Render
  */

  render() {
    const { tags, subject } = this.props;

    return (
      <Paper>
        <List>
         {
           _.map(tags, ({ _id, text }) =>
             <ListItem
               key={_id}
               primaryText={text}
               href={FlowRouter.path('AdminTag', { tagId: _id, subjectId: subject._id })}
             />
           )
         }
        </List>
      </Paper>
    );
  },
});

export default AdminSubjectsTagsList;

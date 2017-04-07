import React from 'react';
import { List, ListItem, Paper } from 'material-ui';

const SchoolTestsList = React.createClass({
  render() {
    const { tests } = this.props;

    return !tests.length ? null : (
      <Paper>
        <List>
         {_.map(tests, test =>
           <ListItem key={test._id} href={FlowRouter.path('SchoolTest', { testId: test._id })}>
            {test.name}
           </ListItem>
         )}
        </List>
      </Paper>
    );
  },
});

export default SchoolTestsList;

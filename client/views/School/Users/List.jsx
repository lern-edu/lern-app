import React from 'react';
import { Paper, List, ListItem } from 'material-ui';
import { FontIcon } from 'material-ui';

const SchoolUsersList = React.createClass({
  render() {
    const { courses } = this.props;

    return (
      <Paper className='ui vertical basic segment'>
        <List>
           <ListItem
            key={name}
            primaryText="{name}"
            rightIcon={<FontIcon
              //data-email={address}
              //onTouchTap=
              className='material-icons'>delete</FontIcon>}

           />
        </List>
      </Paper>
    );
  },
});

export default SchoolUsersList;

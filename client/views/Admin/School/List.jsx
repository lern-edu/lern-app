import React from 'react';
import { List, ListItem } from 'material-ui';

AdminSchoolList = React.createClass({
  render() {
    const { schools } = this.props;

    return !schools.length ? null : (
      <List>
       {_.map(schools, ({ _id: schoolId, profile: { name, schoolType } }) =>
         <ListItem
          key={schoolId}
          href={FlowRouter.path('AdminSchool', { schoolId })}
          primaryText={name}
          secondaryText={SchoolTypes.getName(schoolType)} />
       )}
      </List>
    );
  },
});

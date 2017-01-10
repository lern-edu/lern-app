import React from 'react';
import { Paper, List, ListItem } from 'material-ui';

const AdminSchoolsList = React.createClass({
  render() {
    const { schools, courses, subjects } = this.props;

    return !schools.length ? null : (
      <Paper className='ui vertical basic segment'>
        <List>
         {_.map(schools, ({ _id: schoolId, profile: { name, schoolType } }) =>
           <ListItem
            key={schoolId}
            primaryText={name}
            secondaryText={SchoolTypes.getName(schoolType)}
            nestedItems={_.map(_.filter(courses, ({ author }) =>
              _.isEqual(author, schoolId)), c =>
              <ListItem
               key={_.get(c, '_id')}
               href={FlowRouter.path('AdminCourse',
                { schoolId, courseId: _.get(c, '_id') })}
               primaryText={_.get(c, 'name')}
               secondaryText={_.map(_.filter(subjects, s =>
                _.includes(_.get(c, 'subjects'), s._id)), 'name').join(' - ')} />
            )}/>
         )}
        </List>
      </Paper>
    );
  },
});

export default AdminSchoolsList;

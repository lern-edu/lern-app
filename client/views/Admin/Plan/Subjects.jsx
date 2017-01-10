import React from 'react';
import { List, ListItem, Paper } from 'material-ui';

const AdminPlanSubjects = React.createClass({
  render() {
    const { plan, subjects } = this.props;
    return (
      <Paper className='ui vertical basic segment'>
        <List>
          {_.map(WeekDays.all('keys'), day =>
            <ListItem
              key={day}
              primaryText={WeekDays.getName(day)}
              nestedItems={_.map(_.filter(plan.weekJobs, task =>
                  task.day == day), (t, index) =>
                    <ListItem
                    key={`${t.subject}-${index}`}
                    primaryText={_.get(_.first(_.filter(subjects, s =>
                      s._id === t.subject)), 'name')}
                    secondaryText={`${t.size} questões`}
                  />)}
            />
          )}
        </List>
      </Paper>
    );
  },
});

export default AdminPlanSubjects;

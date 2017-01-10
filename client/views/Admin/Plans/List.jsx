import React from 'react';
import { Paper, List, ListItem } from 'material-ui';

const AdminPlansList = React.createClass({
  render() {
    const { plans } = this.props;

    return !plans.length ? null : (
      <Paper className='ui vertical basic segment'>
        <List>
         {_.map(plans, plan =>
           <ListItem key={plan._id} href={FlowRouter.path('AdminPlan', { planId: plan._id })}>
            {plan.name}
           </ListItem>
         )}
        </List>
      </Paper>
    );
  },
});

export default AdminPlansList;

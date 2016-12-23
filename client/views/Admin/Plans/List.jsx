import React from 'react';
import { List, ListItem } from 'material-ui';

AdminPlansList = React.createClass({
  render() {
    const { plans } = this.props;

    return !plans.length ? null : (
      <List>
       {_.map(plans, plan =>
         <ListItem key={plan._id} href={FlowRouter.path('AdminPlan', { planId: plan._id })}>
          {plan.name}
         </ListItem>
       )}
      </List>
    );
  },
});

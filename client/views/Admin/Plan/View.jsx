// Libs
import React from 'react';
import { LinearProgress, Paper, Divider } from 'material-ui';

// Views
import AdminPlanSubjects from './Subjects.jsx';
import AdminPlanHeader from './Header.jsx';

AdminPlanView = React.createClass({
  mixins: [ReactMeteorData],

  /* Reactive Data Fetching
  */

  getMeteorData() {
    const { planId } = this.props;

    const handles = {
      plan: Meteor.subscribe('AdminPlans', { planId }, { subjects: true }),
    };

    const data = {
      ready: _.mapValues(handles, h => h.ready()),
      plan: _.first(Fetch.General.plans(planId).fetch()),
    };

    data.subjects = data.plan && data.plan.findSubjects().fetch();
    return data;
  },

  /* Render
  */

  render() {
    const { ready, plan } = this.data;

    return (
      <div className='ui container'>

        <Layout.Bar
          title={_.get(plan, 'name')}
          crumbs={[
            { label: 'Planos', path: 'AdminPlans' },
          ]}
        />

        <Paper>
          {!_.every(ready) ? <LinearProgress/> : [
            <AdminPlanHeader key='header' {...this.data}/>,
            <Divider key='d0'/>,
            <AdminPlanSubjects key='subjects' {...this.data}/>,
          ]}
        </Paper>

      </div>
    );
  },
});

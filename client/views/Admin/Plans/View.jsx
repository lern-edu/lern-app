import React from 'react';
import { LinearProgress } from 'material-ui';

AdminPlansView = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    const handles = {
      plans: Meteor.subscribe('AdminPlans'),
    };

    return {
      ready: _.mapValues(handles, h => h.ready()),
      plans: Fetch.General.plans().fetch(),
      subjects: Fetch.General.subjects().fetch(),
    };
  },

  /* Render
  */

  render() {
    const { ready } = this.data;

    return (
      <div className='ui container'>

        <Layout.Bar title='Planos' crumbs={[{ label: 'Planos', path: 'AdminPlans' }]} />

        {!_.every(ready) ? <LinearProgress/> : [
          <AdminPlansToolbar key='toolbar' {...this.data}/>,
          <AdminPlansList key='list' {...this.data}/>,
        ]}

      </div>
    );
  },
});

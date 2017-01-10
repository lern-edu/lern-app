// Libs
import React from 'react';
import { LinearProgress } from 'material-ui';

// Views
import AdminPlansToolbar from './Toolbar.jsx';
import AdminPlansList from './List.jsx';

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

        <Layout.Bar title='Planos' />

        {!_.every(ready) ? <LinearProgress/> : [
          <AdminPlansToolbar key='toolbar' {...this.data}/>,
          <AdminPlansList key='list' {...this.data}/>,
        ]}

      </div>
    );
  },
});

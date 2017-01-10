import React from 'react';
import { LinearProgress } from 'material-ui';

AdminPlanCreateView = React.createClass({
  mixins: [ReactMeteorData],

  /* Reactive Data Fetching
  */

  getMeteorData() {
    const handles = {
      subjects: Meteor.subscribe('PublicSubjects'),
    };

    return {
      ready: _.mapValues(handles, h => h.ready()),
      subjects: Fetch.Public().subjects().fetch(),
    };
  },

  /* Render
  */

  render() {
    const { ready } = this.data;

    return (
      <div className='ui container'>

        <Layout.Bar
          title='Criar Novo'
          crumbs={[{ label: 'Planos', path: 'AdminPlans' }]} />

        {!_.every(ready) ? <LinearProgress/> : <AdminPlanCreateForm {...this.data} />}

      </div>
    );
  },
});

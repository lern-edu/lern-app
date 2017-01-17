// Libs
import React from 'react';
import { LinearProgress } from 'material-ui';

// Views
import AdminTestsList from './List.jsx';
import AdminTestsToolbar from './Toolbar.jsx';

AdminTestsView = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    const userId = Meteor.userId();

    const handles = {
      tests: Meteor.subscribe('AdminTests', userId),
    };

    return {
      ready: _.mapValues(handles, h => h.ready()),
      tests: Fetch.General.tests().fetch(),
    };
  },

  // render

  render() {
    const { ready } = this.data;

    return (
      <div className='ui container' >

        <Layout.Bar title='Provas' />

        {!_.every(ready) ? <LinearProgress/> : [
          <AdminTestsToolbar key='toolbar' {...this.data} />,
          <AdminTestsList key='list' {...this.data} />,
        ]}

      </div>
    );
  },
});

// Libs
import React from 'react';
import { LinearProgress } from 'material-ui';

// Views
import SchoolTestsList from './List.jsx';
import SchoolTestsToolbar from './Toolbar.jsx';

SchoolTestsView = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    const userId = Meteor.userId();

    const handles = {
      tests: Meteor.subscribe('SchoolTests', userId),
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
          <SchoolTestsToolbar key='toolbar' {...this.data} />,
          <SchoolTestsList key='list' {...this.data} />,
        ]}

      </div>
    );
  },
});

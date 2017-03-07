// Libs
import React from 'react';
import { LinearProgress } from 'material-ui';

// Views
import AdminContentToolbar from './Toolbar.jsx';
import AdminContentList from './List.jsx';

AdminContentView = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    const handles = {
      subjects: Meteor.subscribe('PublicSubjects'),
      tags: Meteor.subscribe('PublicTags'),
    };

    const data = {
      ready: _.mapValues(handles, h => h.ready()),
      subjects: Fetch.Public().subjects().fetch(),
      tags: Fetch.Public().tags().fetch(),
    };

    return data;
  },

  render() {
    const { ready } = this.data;
    return (
      <div className='ui container'>

        <Layout.Bar title='Conteúdo' />

        {_.every(ready) ? [
          <AdminContentToolbar key='toolbar' {...this.data} />,
          <AdminContentList key='list' {...this.data} />,
        ] : <LinearProgress/>}
      </div>
    );
  },

});

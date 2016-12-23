import React from 'react';

StudentTestRequestView = React.createClass({
  mixins: [ReactMeteorData],

  /* Reactive Data Fetching
  */

  getMeteorData() {
    const handles = {
      subjects: Meteor.subscribe('PublicSubjects'),
      tags: Meteor.subscribe('PublicTags'),
    };

    return {
      ready: _.mapValues(handles, h => h.ready()),
      subjects: Fetch.Public().subjects().fetch(),
      tags: Fetch.Public().tags().fetch(),
    };
  },

  /* Render
  */

  render() {
    const { ready } = this.data;
    return (
      <div>

        <Layout.Bar
          title='Novo Treino'
          crumbs={[
            { label: 'Estudos', path: 'StudentTests' },
          ]}
        />

        {!_.every(ready) ? <MUI.LinearProgress /> :
          <div className='ui container'>
            <StudentTestRequestForm {...this.data} />
          </div>}

      </div>
    );
  },
});

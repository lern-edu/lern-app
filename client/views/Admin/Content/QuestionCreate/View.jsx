import React from 'react';
import { CircularProgress } from 'material-ui';

AdminQuestionCreateView = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    const images = Session.get('images');

    const handles = {
      subjects: Meteor.subscribe('PublicSubjects'),
      tags: Meteor.subscribe('PublicTags'),
    };

    if (images)
      handles.images = Meteor.subscribe('AdminImages', images);

    const data = {
      ready: _.mapValues(handles, h => h.ready()),
      subjects: Fetch.Public().subjects().fetch(),
      tags: Fetch.Public().tags().fetch(),
    };

    if (images)
      data.images = Fetch.General.images().fetch();

    return data;
  },

  render() {
    const { ready } = this.data;
    return (
      <div className='ui container'>

        <Layout.Bar
          title='Nova questão'
          crumbs={[
            { label: 'Conteúdo', path: 'AdminContent' },
          ]}
        />

        {!(ready.subjects || ready.tags) ? <MUI.LinearProgress/> :
          <AdminQuestionCreateForm {...this.data} restore={this.props.query} />}

      </div>
    );
  },

});

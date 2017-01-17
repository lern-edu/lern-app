import React from 'react';
import { LinearProgress } from 'material-ui';
import { createContainer } from 'meteor/react-meteor-data';

const View = React.createClass({

  render() {
    const { ready, query } = this.props;
    return (
      <div className='ui container'>

      <Layout.Bar
          title='Nova questão'
          crumbs={[{ label: 'Conteúdo', path: 'AdminContent' }]} />

        {!(ready.subjects || ready.tags) ? <LinearProgress/> :
          <AdminQuestionCreateForm {...this.props} restore={query} />}

      </div>
    );
  },

});

AdminQuestionCreateView = createContainer(() => {
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
}, View);

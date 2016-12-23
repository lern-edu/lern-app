import React from 'react';

AdminSubjectView = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    const { subjectId } = this.props;
    const handles = { subject: Meteor.subscribe('PublicSubject', { subjectId }) };

    const data = {
      ready: _.mapValues(handles, h => h.ready()),
      subject: _.first(Fetch.General.subjects(subjectId).fetch()),
    };

    data.tags = data.subject && data.subject.findTags().fetch();

    return data;
  },

  render() {
    const { ready, subject } = this.data;
    return (
      <div>
        <Layout.Bar title={_.get(subject, 'name')}
        crumbs={[
          { label: 'Conteúdo', path: 'AdminContent' },
        ]} />

        <div className='ui centered grid'>
          <div className='ten wide computer sixteen wide tablet column'>
            {_.every(ready) ? [
              <AdminSubjectToolbar key='toolbar' {...this.data} />,
              <AdminSubjectList key='list' {...this.data} />,
            ] : <MUI.LinearProgress/>}
          </div>
        </div>
      </div>
    );
  },
});

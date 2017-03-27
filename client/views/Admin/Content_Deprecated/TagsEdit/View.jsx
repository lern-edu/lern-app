import React from 'react';

AdminTagEditView = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    const { tagId } = this.props;
    const handles = { tags: Meteor.subscribe('PublicTags', { tagId }) };

    const data = {
      ready: _.mapValues(handles, h => h.ready()),
      tag: _.first(Fetch.Public().tags(tagId).fetch()),
    };

    data.subject = data.tag && _.first(data.tag.findSubject().fetch());

    return data;
  },

  render() {
    const { ready, tag, subject: { name, _id: subjectId }={} } = this.data;
    return (
      <div>
        <Layout.Bar title={_.get(tag, 'text')}
        crumbs={[
          { label: 'Conteúdo', path: 'AdminContent' },
          { label: name, path: FlowRouter.path('AdminSubject', { subjectId }) },
        ]} />

        <div className='ui centered grid'>
          <div className='ten wide computer sixteen wide tablet column'>
            {_.every(ready) ?
              <AdminTagEditForm {...this.data} doc={tag} />
            : <MUI.LinearProgress/>}
          </div>
        </div>
      </div>
    );
  },
});

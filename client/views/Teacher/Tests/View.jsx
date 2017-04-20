import React from 'react';

TeacherTestsView = React.createClass({
  mixins: [ReactMeteorData],

  // static data

  styles: {
    main: { className: 'twelve wide computer sixteen wide tablet column' },
    floatingButton: {
      className: 'ui right aligned basic segment',
      style: { position: 'fixed', bottom: '1em', right: '1em', zIndex: '1000' },
    },
  },

  /* Reactive Data Fetching
  */

  getMeteorData() {
    const author = Meteor.userId();
    const { query: { subjects, tags, course, text, order }={} } = this.props;

    const handles = {
      courses: Meteor.subscribe('TeacherCourses', {}, { tags: true, subjects: true }),
      tests: Meteor.subscribe('TeacherTestsFind', { subjects, tags, course, author },
        { text, order }, { limit: 50 }),
    };

    return {
      ready: _.mapValues(handles, h => h.ready()),
      subjects: Fetch.Public().subjects().fetch(),
      tags: Fetch.Public().tags().fetch(),
      tests: Fetch.General.tests().fetch(),
      courses: Fetch.General.courses().fetch(),
    };
  },

  // Render

  render() {
    const { styles: { main }, data: { ready } } = this;
    return (
      <div>
        <Layout.Bar title='Testes' />

        <div className='ui centered grid'>

          <div {...main} style={{ marginTop: '1em' }}>
            {!_.every(ready) ? <MUI.LinearProgress /> : [
              // <TeacherTestsToolbar {...this.data} {...this.props} />,
              undefined,
            ]}
          </div>

          </div>
      </div>
    );
  },
});

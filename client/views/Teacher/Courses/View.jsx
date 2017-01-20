import React from 'react';
import LinearProgress from 'material-ui';

TeacherCoursesView = React.createClass({
  mixins: [ReactMeteorData],

  /* Reactive Data Fetching
  */

  getMeteorData() {
    const userId = Meteor.userId();

    const handles = {
      courses: Meteor.subscribe('TeacherCourses', {},
        { subjects: true, tags: true }),
    };

    return {
      ready: _.mapValues(handles, h => h.ready()),
      subjects: Fetch.Public().subjects().fetch(),
      tags: Fetch.Public().tags().fetch(),
      courses: Fetch.Teacher(userId).courses().fetch(),
    };
  },

  render() {
    const { ready } = this.data;
    return (
      <div className='ui container'>

        <Layout.Bar title='Turmas' />
        {!_.every(ready) ? <LinearProgress /> :
        <div className='ui basic segment'>
          <TeacherCoursesGallery {...this.data} />
        </div>}

      </div>
    );
  },
});

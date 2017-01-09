import React from 'react';
import { LinearProgress } from 'material-ui';

StudentCoursesView = React.createClass({
  mixins: [ReactMeteorData],

  /* Reactive Data Fetching
  */

  getMeteorData() {
    const userId = Meteor.userId();

    const handles = {
      subjects: Meteor.subscribe('PublicSubjects'),
      tags: Meteor.subscribe('PublicTags'),
      courses: Meteor.subscribe('StudentCourses'),
    };

    return {
      ready: _.mapValues(handles, h => h.ready()),
      subjects: Fetch.Public().subjects().fetch(),
      tags: Fetch.Public().tags().fetch(),
      courses: Fetch.Student(userId).courses().fetch(),
    };
  },

  render() {
    const { ready } = this.data;
    return (
      <div className='ui container'>

        <Layout.Bar title='Disciplinas' />
        {!_.every(ready) ? <LinearProgress /> :
        <div className='ui basic segment'>
          <StudentCoursesGallery {...this.data} />
        </div>}

      </div>
    );
  },
});

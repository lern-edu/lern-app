import React from 'react';

AdminCourseCreateView = React.createClass({
  mixins: [ReactMeteorData],

  /* Reactive Data Fetching
  */

  getMeteorData() {
    const { schoolId } = this.props;
    const userId = Meteor.userId();

    const handles = {
      subjects: Meteor.subscribe('PublicSubjects'),
      tags: Meteor.subscribe('PublicTags'),
      users: Meteor.subscribe('AdminSchoolUsers', schoolId),
    };

    return {
      ready: _.mapValues(handles, h => h.ready()),
      subjects: Fetch.Public().subjects().fetch(),
      tags: Fetch.Public().tags().fetch(),
      students: Fetch.School(schoolId).students().fetch(),
      teachers: Fetch.School(schoolId).teachers().fetch(),
    };
  },

  /* Render
  */

  render() {
    return (
      <div className='ui container'>
        <Layout.Bar title='Nova disciplina' />
        <AdminCourseCreateForm {...this.data} />
      </div>
    );
  },
});

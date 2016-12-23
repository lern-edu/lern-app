import React from 'react';

TeacherLectureCreateView = React.createClass({
  mixins: [ReactMeteorData],

  /* Reactive Data Fetching
  */

  getMeteorData() {
    const { courseId } = this.props;

    const handles = {
      course: Meteor.subscribe('TeacherCourses', { courseId }),
      tags: Meteor.subscribe('PublicTags'),
      subjects: Meteor.subscribe('PublicSubjects'),
    };

    return {
      ready: _.mapValues(handles, h => h.ready()),
      course: _.first(Fetch.General.courses(courseId).fetch()),
      tags: Fetch.Public().tags().fetch(),
      subjects: Fetch.Public().subjects().fetch(),
    };
  },

  render() {
    const { ready, course } = this.data;
    return (
      <div className='ui container'>

        <Layout.Bar
          title='Nova Aula'
          crumbs={[
            { label: 'Disciplinas', path: 'TeacherCourses' },
            { label: _.get(course, 'name'), path: FlowRouter.path('TeacherCourseShow', { courseId: _.get(course, '_id') }) },
          ]}
        />

        {_.every(ready)
          ? <TeacherLectureCreateForm {...this.data} />
          : <div className='ui active loader' />
        }

      </div>
    );
  },
});

import React from 'react';

SchoolHomeView = React.createClass({
  mixins: [ReactMeteorData],

  /* Reactive Data Fetching
  */

  getMeteorData() {
    const userId = Meteor.userId();

    const handles = [
      Meteor.subscribe('SchoolCourses'),
      Meteor.subscribe('PublicSubjects'),
    ];

    return {
      ready: _.every(handles, h => h.ready()),
      courses: Fetch.School(userId).courses().fetch(),
      subjects: Fetch.General().subjects().fetch(),
    };
  },

  /* Render
  */

  render() {
    const { ready, courses, subjects } = this.data;

    return (
      <div className={`ui ${ready ? '' : 'loading'} segments`}>

        <div className='ui segment'>
          <div className='ui header'> Ações </div>

          <div className='ui link list'>
            <a href={FlowRouter.path('SchoolCourseUpsert')} className='item'>
              Nova Disciplina
            </a>
          </div>
        </div>

        <div className='ui segment'>
          <div className='ui header'> Minhas Disciplinas </div>

          <div className='ui list'>
            {_.map(courses, c =>
              <div className='item' key={c._id}>
                <div className='header'> {c.name} </div>
                <div className='description'> {_.get(_.find(subjects, s => s._id = c.subject), 'name')} </div>
              </div>
            )}
          </div>
        </div>

      </div>
    );
  },
});

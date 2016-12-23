import React from 'react';

TeacherCoursesGallery = React.createClass({
  /* Render
  */

  render() {
    const { ready, courses } = this.props;

    return (
      <div className='ui grid'>
        {!ready.courses ? <MUI.LinearProgress /> : !courses.length ? (
          <Layout.NotFound path={FlowRouter.path('TeacherHome')}
            message='Você não está em nenhum curso'
            icon='bookmark_border'/>) : (_.map(courses, c =>
              <TeacherCoursesGalleryCard
                key={c._id}
                course={c}
                {...this.props} />
          ))}
      </div>
    );
  },
});

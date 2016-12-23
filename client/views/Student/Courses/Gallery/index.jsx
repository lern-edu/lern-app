import React from 'react';

StudentCoursesGallery = React.createClass({
  /* Render
  */

  render() {
    const { ready, courses } = this.props;

    return (
      <div className='ui grid'>
        {!ready.courses ? <MUI.LinearProgress /> : !courses.length ? (
          <Layout.NotFound path={FlowRouter.path('StudentHome')}
            message='Você não está em nenhum curso'
            icon='bookmark_border'/>) : (_.map(courses, c =>
                <StudentCoursesGalleryCard
                  key={c._id}
                  course={c}
                  {...this.props} />
          ))}
      </div>);
  },
});

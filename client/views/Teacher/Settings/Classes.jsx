import React from 'react';
import { LinearProgress } from 'material-ui';

TeacherSettingsClasses = React.createClass({
  /* Render
  */

  render() {
    const { ready, courses } = this.props;

    return (
      <div className='ui basic segment'>
        {!ready.courses ? <LinearProgress /> : !courses.length ? (
          <Layout.NotFound path={FlowRouter.path('TeacherHome')}
            message='Você não está em nenhum curso'
            icon='bookmark_border'/>) : (_.map(courses, c =>
              <TeacherCoursesGalleryCard
                key={c._id}
                course={c}
                {...this.props} />
          ))}
          <p>sup nigga</p>
      </div>
  )},
});

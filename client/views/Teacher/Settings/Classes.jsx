import React from 'react';
import { LinearProgress } from 'material-ui';

const TeacherSettingsClasses = React.createClass({
  /* Render
  */

  render() {
    const { ready, courses } = this.props;

    return (
      <div className='ui basic segment' style={{ marginTop: '0' }}>
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
export default TeacherSettingsClasses;

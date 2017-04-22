import React from 'react';
import { LinearProgress } from 'material-ui';
import TeacherCoursesGallery from './Gallery/index.jsx';

const TeacherCoursesView = React.createClass({
  /* Reactive Data Fetching
  */

  render() {
    const { ready } = this.props;
    return (
      <div className='ui container'>

        <Layout.Bar title='Turmas' />
        {
          !_.every(ready)
          ? <LinearProgress />
          : <div className='ui basic segment'>
            <TeacherCoursesGallery {...this.props} />
          </div>
        }

      </div>
    );
  },
});

export default TeacherCoursesView;

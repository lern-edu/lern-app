import React from 'react';
import { AutoComplete, MenuItem, FloatingActionButton,
LinearProgress, FontIcon } from 'material-ui';

import TeacherPostsCards from './Cards.jsx';
import TeacherPostsToolbar from './Toolbar.jsx';

const TeacherPostsView = React.createClass({

  // Render

  render() {
    const { ready, courses, tags, subjects, query } = this.props;

    return (
      <div className='ui container' >

        <Layout.Bar title='Posts' />

        <TeacherPostsToolbar {...this.props} />

        {
          !_.every(ready)
          ? <LinearProgress/>
          : <TeacherPostsCards {...this.props} />
        }

      </div>
    );
  },
});

export default TeacherPostsView;

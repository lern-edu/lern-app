// Libs
import React from 'react';
import { LinearProgress } from 'material-ui';

// Views
import TeacherPostForm from './Form/index.jsx';

const TeacherPostView = React.createClass({

  /* Render
  */

  render() {
    const { ready, post } = this.props;

    return (
      <div className='ui container'>

        <Layout.Bar
          title={_.get(post, 'name')}
          crumbs={[
            { label: 'Posts', path: 'TeacherPosts' },
          ]}
        />

        {
          !_.every(ready)
          ? <LinearProgress />
          : <TeacherPostForm {...this.props} doc={post} />
        }

      </div>
    );
  },
});

export default TeacherPostView;

// Libs
import React from 'react';
import { LinearProgress } from 'material-ui';

// Views
import StudentPostForm from './Form/index.jsx';

const StudentPostView = React.createClass({

  /* Render
  */

  render() {
    const { ready, post } = this.props;

    return (
      <div className='ui container'>

        <Layout.Bar
          title={_.get(post, 'name')}
          crumbs={[
            { label: 'Posts', path: 'StudentPosts' },
          ]}
        />

        {
          !_.every(ready)
          ? <LinearProgress />
          : <StudentPostForm {...this.props} doc={post} />
        }

      </div>
    );
  },
});

export default StudentPostView;

// Libs
import React from 'react';
import { LinearProgress } from 'material-ui';

// Views
import StudentPostShowContent from './Content.jsx';
import StudentPostShowNewComment from './NewComment.jsx';
import StudentPostShowComments from './Comments.jsx';

const StudentPostShowView = React.createClass({

  // Render

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
          : [
            <StudentPostShowContent {...this.props} key='content' />,
            <StudentPostShowNewComment {...this.props} key='newComent' />,
            <StudentPostShowComments {...this.props} key='comment' />,
          ]
        }

      </div>
    );
  },
});

export default StudentPostShowView;

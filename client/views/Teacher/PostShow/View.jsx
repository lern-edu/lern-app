// Libs
import React from 'react';
import { LinearProgress } from 'material-ui';

// Views
import TeacherPostShowContent from './Content.jsx';
import TeacherPostShowNewComment from './NewComment.jsx';
import TeacherPostShowComments from './Comments.jsx';

const TeacherPostShowView = React.createClass({

  // Render

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
          : [
            <TeacherPostShowContent {...this.props} key='content' />,
            <TeacherPostShowNewComment {...this.props} key='newComent' />,
            <TeacherPostShowComments {...this.props} key='comment' />,
          ]
        }

      </div>
    );
  },
});

export default TeacherPostShowView;

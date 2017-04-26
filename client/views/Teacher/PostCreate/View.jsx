// Libs
import React from 'react';
import { LinearProgress } from 'material-ui';

// Views
import TeacherPostCreateForm from './Form/index.jsx';

const TeacherPostCreateView = React.createClass({

  /* Render
  */

  render() {
    const { ready } = this.props;

    return (
      <div className='ui container'>

        <Layout.Bar
          title='Novo Post'
          crumbs={[
            { label: 'Posts', path: 'TeacherPosts' },
          ]}
        />

        {
          !_.every(ready)
          ? <LinearProgress />
          : <TeacherPostCreateForm {...this.props} />
        }

      </div>
    );
  },
});

export default TeacherPostCreateView;

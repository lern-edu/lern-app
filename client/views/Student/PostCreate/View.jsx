// Libs
import React from 'react';
import { LinearProgress } from 'material-ui';

// Views
import StudentPostCreateForm from './Form/index.jsx';

const StudentPostCreateView = React.createClass({

  /* Render
  */

  render() {
    const { ready } = this.props;

    return (
      <div className='ui container'>

        <Layout.Bar
          title='Novo Post'
          crumbs={[
            { label: 'Posts', path: 'StudentPosts' },
          ]}
        />

        {
          !_.every(ready)
          ? <LinearProgress />
          : <StudentPostCreateForm {...this.props} />
        }

      </div>
    );
  },
});

export default StudentPostCreateView;

// Libs
import React from 'react';
import { LinearProgress } from 'material-ui';

// Views
import AdminSubjectsForm from './Form/index.jsx';
import AdminSubjectsTags from './Tags/index.jsx';

const AdminSubjectView = React.createClass({

  render() {
    const { ready, subject, tags } = this.props;

    return (
      <div className='ui container'>

        <Layout.Bar
          title={_.get(subject, 'name')}
          crumbs={[{ label: 'Matérias', path: 'AdminSubjects' }]}
        />

        {
          !_.every(ready)
          ? <LinearProgress />
          : [
            <AdminSubjectsForm doc={subject} key='subject' />,
            <AdminSubjectsTags {...this.props} key='tags' />,
          ]
        }

      </div>
    );
  },

});

export default AdminSubjectView;

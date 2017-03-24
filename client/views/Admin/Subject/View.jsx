// Libs
import React from 'react';
import { LinearProgress } from 'material-ui';

// Views
import AdminSubjectsForm from './Form/index.jsx';

// import AdminSubjectsList from './List.jsx';

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
          ]
        }

      </div>
    );
  },

});

export default AdminSubjectView;

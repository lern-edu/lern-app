// Libs
import React from 'react';
import { LinearProgress } from 'material-ui';

// Views
import AdminTagForm from './Form/index.jsx';

const AdminTagView = React.createClass({

  render() {
    const { ready, subject, tag } = this.props;

    return (
      <div className='ui container'>

        <Layout.Bar
          title={_.get(tag, 'text')}
          crumbs={
            [
              {
                label: 'Matérias',
                path: 'AdminSubjects',
              }, {
                label: _.get(subject, 'name'),
                path: FlowRouter.path('AdminSubject', { subjectId: _.get(subject, '_id') }),
              },
            ]
          }
        />

        {
          !_.every(ready)
          ? <LinearProgress />
          : <AdminTagForm {...this.props} doc={tag} />
        }

      </div>
    );
  },

});

export default AdminTagView;

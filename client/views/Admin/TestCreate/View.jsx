// Lib
import React from 'react';
import { LinearProgress } from 'material-ui';

// View
import AdminTestCreateForm from './Form/index.jsx';

const AdminTestCreateView = React.createClass({

  /* Render
  */

  render() {
    const { test, ready } = this.props;
    return (
      <div className='ui container'>

        <Layout.Bar
          title='Nova Prova'
          crumbs={
            [{ label: 'Provas', path: 'AdminTests' }]
          }
        />

        {
          !_.every(ready)
          ? <LinearProgress />
          : <AdminTestCreateForm
            {..._.omit(this.props, ['test'])}
            doc={
              test
              ? new Tests.Schema(
                _.omit(test, ['_id', 'createdAt', 'updatedAt', 'author'])
              )
              : false
            }
          />
        }

      </div>
    );
  },
});

export default AdminTestCreateView;

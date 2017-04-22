// Lib
import React from 'react';
import { LinearProgress } from 'material-ui';

// View
import TeacherTestCreateForm from './Form/index.jsx';

const TeacherTestCreateView = React.createClass({

  /* Render
  */

  render() {
    const { test, ready } = this.props;

    return (
      <div className='ui container'>

        <Layout.Bar
          title='Novo Teste'
          crumbs={
            [{ label: 'Testes', path: 'TeacherTests' }]
          }
        />

        {
          !_.every(ready)
          ? <LinearProgress />
          : <TeacherTestCreateForm
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

export default TeacherTestCreateView;

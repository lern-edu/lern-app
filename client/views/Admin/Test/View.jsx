// Libs
import React from 'react';
import { Divider, Paper, LinearProgress } from 'material-ui';

// Views
import AdminTestHeader from './Header.jsx';
import AdminTestActions from './Actions.jsx';
import AdminTestForm from './Form/index.jsx';

export default class AdminTestView extends React.Component {

  /* Render
  */

  render() {
    const { ready, test, subjects } = this.data;
    return (
      <div className='ui container'>

        <Layout.Bar
          title={_.get(test, 'name')}
          crumbs={[{ label: 'Testes', path: 'AdminTests' }]} />

        <Paper>
          {!_.every(ready) ? <LinearProgress/> : [
            <AdminTestHeader key='header' {...this.data} />,
            <Divider key='d0'/>,
            <AdminTestForm key='question' doc={test} subjects={subjects} />,
            <Divider key='d1'/>,
            <AdminTestActions key='actions' {...this.data} />,
          ]}
        </Paper>

      </div>
    );
  }

};

// Libs
import React from 'react';
import { Divider, Paper, LinearProgress } from 'material-ui';

// Views
import SchoolTestHeader from './Header.jsx';
import SchoolTestActions from './Actions.jsx';
import SchoolTestForm from './Form/index.jsx';

const SchoolTestView = React.createClass({

  /* Render
  */

  render() {
    const { ready, test, subjects } = this.props;
    console.log(ready, test);
    return (
      <div className='ui container'>

        <Layout.Bar
          title={_.get(test, 'name')}
          crumbs={[{ label: 'Testes', path: 'SchoolTests' }]} />

        <Paper>
          {
            !_.every(ready)
            ? <LinearProgress/>
            : [
              <SchoolTestHeader key='header' {...this.props} />,
              <Divider key='d0'/>,
              <SchoolTestForm key='question' doc={test} subjects={subjects} />,
            ]
          }
        </Paper>

      </div>
    );
  },
});

export default SchoolTestView;

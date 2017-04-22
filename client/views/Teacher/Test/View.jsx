// Libs
import React from 'react';
import { Divider, Paper, LinearProgress } from 'material-ui';

// Views
import TeacherTestHeader from './Header.jsx';
import TeacherTestActions from './Actions.jsx';
import TeacherTestForm from './Form/index.jsx';

const TeacherTestView = React.createClass({

  /* Render
  */

  render() {
    const { ready, test, subjects } = this.props;

    return (
      <div className='ui container'>

        <Layout.Bar
          title={_.get(test, 'name')}
          crumbs={[{ label: 'Testes', path: 'TeacherTests' }]}
        />

        <Paper>
          {!_.every(ready) ? <LinearProgress/> : [
            <TeacherTestHeader key='header' {...this.props} />,
            <Divider key='d0'/>,
            <TeacherTestForm key='question' doc={test} subjects={subjects} />,

            // <Divider key='d1'/>,
            // <TeacherTestActions key='actions' {...this.props} />,
          ]}
        </Paper>

      </div>
    );
  },
});

export default TeacherTestView;

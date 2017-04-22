// Libs
import React from 'react';
import { LinearProgress } from 'material-ui';

// Views
import TeacherTestsList from './List.jsx';
import TeacherTestsToolbar from './Toolbar.jsx';

const TeacherTestsView = React.createClass({

  // render

  render() {
    const { ready } = this.props;

    return (
      <div className='ui container' >

        <Layout.Bar title='Testes' />

        {
          !_.every(ready)
          ? <LinearProgress/>
          : [
            <TeacherTestsToolbar key='toolbar' {...this.props} />,
            <TeacherTestsList key='list' {...this.props} />,
          ]
        }

      </div>
    );
  },
});

export default TeacherTestsView;

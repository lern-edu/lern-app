// Libs
import React from 'react';
import { LinearProgress } from 'material-ui';

// Views
import AdminTestsList from './List.jsx';
import AdminTestsToolbar from './Toolbar.jsx';

export default class AdminTestsView extends React.Component {

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
            <AdminTestsToolbar key='toolbar' {...this.props} />,
            <AdminTestsList key='list' {...this.props} />,
          ]
        }

      </div>
    );
  }
};

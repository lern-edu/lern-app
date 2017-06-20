// Libs
import React from 'react';
import { LinearProgress } from 'material-ui';

// Views
import SchoolTestsList from './List.jsx';
import SchoolTestsToolbar from './Toolbar.jsx';

export default class SchoolTestsView extends React.Component {

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
            <SchoolTestsToolbar key='toolbar' {...this.props} />,
            <SchoolTestsList key='list' {...this.props} />,
          ]
        }

      </div>
    );
  }
};

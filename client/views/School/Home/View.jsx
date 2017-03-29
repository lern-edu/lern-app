// Libs
import React from 'react';
import LinearProgress from 'material-ui';
import { blue700 } from 'material-ui/styles/colors';

// Views
import SchoolHomeToolbar from './Toolbar.jsx';
import SchoolHomeTutorial from './Tutorial.jsx';
import SchoolHomeOverview from './Overview.jsx';

const SchoolHomeView = React.createClass({

  /* Render
  */

  render() {

    return (
      <div style={{ backgroundColor: blue700, height: '90vh' }}>
        <Layout.Bar title='Início' />
        <div>
        {/*{!_.every(ready) ? <LinearProgress /> : _.get({
          true: <SchoolHomeTutorial {...this.text} key='tutorial'/>,
          false: <SchoolHomeOverview {...this.data} key='overview'/>,
        }, tutorial)}*/}
          <SchoolHomeOverview />
        </div>
      </div>
    );
  },
});
export default SchoolHomeView;

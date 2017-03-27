// Libs
import React from 'react';
import { LinearProgress } from 'material-ui';

// Views
import AdminSubjectsToolbar from './Toolbar.jsx';
import AdminSubjectsList from './List.jsx';

const AdminSubjectsView = React.createClass({

  render() {
    const { ready } = this.props;
    return (
      <div className='ui container'>

        <Layout.Bar title='Matérias' />

        {_.every(ready) ? [
          <AdminSubjectsToolbar key='toolbar' {...this.props} />,
          <AdminSubjectsList key='list' {...this.props} />,
        ] : <LinearProgress/>}
      </div>
    );
  },

});

export default AdminSubjectsView;

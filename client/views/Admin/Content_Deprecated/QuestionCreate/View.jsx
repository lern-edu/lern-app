// Libs
import React from 'react';
import { LinearProgress } from 'material-ui';

// View
import AdminQuestionCreateForm from './Form/index.jsx';

const View = React.createClass({

  render() {
    const { ready, query } = this.props;
    return (
      <div className='ui container'>

      <Layout.Bar
          title='Nova questão'
          crumbs={[{ label: 'Conteúdo', path: 'AdminContent' }]} />

      <AdminQuestionCreateForm {...this.props} restore={query} />

      </div>
    );
  },

});

export default View;

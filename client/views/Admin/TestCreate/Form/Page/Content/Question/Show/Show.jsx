// Libs
import React from 'react';
import { CircularProgress } from 'material-ui';

// Views
import AdminTestCreateFormPageQuestionSearchShowQuestion from './Question.jsx';

const AdminTestCreateFormPageQuestionSearchShowView = React.createClass({

  // Lifecycle

  // Render

  render() {
    const { questions, ready, parent } = this.props;

    return (
      <div className='ui grid' >

        {!_.every(ready) ? <CircularProgress size={60} thickness={7} /> :
        _.map(questions, q =>
        <AdminTestCreateFormPageQuestionSearchShowQuestion
          key={q._id} question={q} {..._.omit(this.props, ['questions', 'query'])}
        />)}

        <div className='row' >
          <PublicMiscPagination
            size={50}
            page={parent.state.skip}
            total={parent.state.questionsCount}
            add={parent.handleSkipAdd}
            length={questions.length}
            less={parent.handleSkipLess} />
        </div>
      </div>
    );
  },
});

export default AdminTestCreateFormPageQuestionSearchShowView;

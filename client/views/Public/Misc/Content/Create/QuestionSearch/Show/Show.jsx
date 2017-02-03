// Libs
import React from 'react';
import { CircularProgress } from 'material-ui';

// Views
import PublicContentCreateQuestionSearchShowQuestion from './Question.jsx';

const PublicContentCreateQuestionSearchShowView = React.createClass({

  // Lifecycle

  // Render

  render() {
    const { questions, ready, parent, questionsSelected } = this.props;

    const questionsNotSelected = _.filter(questions, q =>
      !_.includes(questionsSelected, q._id));

    return (
      <div className='ui fluid grid' style={{ width: '100%' }}>

        {!_.every(ready) ? <CircularProgress size={60} thickness={7} /> :
        _.map(questionsNotSelected, q =>
          <PublicContentCreateQuestionSearchShowQuestion
            key={q._id} question={q} {..._.omit(this.props, ['questions', 'query'])}
          />
        )}

        <div className='row' >
          <PublicMiscPagination
            size={50}
            page={parent.state.skip}
            total={parent.state.questionsCount}
            add={parent.handleSkipAdd}
            length={questionsNotSelected.length}
            less={parent.handleSkipLess} />
        </div>
      </div>
    );
  },
});

export default PublicContentCreateQuestionSearchShowView;

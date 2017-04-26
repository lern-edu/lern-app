import React from 'react';
import { LinearProgress, FontIcon } from 'material-ui';
import { AutoComplete, MenuItem, FloatingActionButton } from 'material-ui';

import TeacherPostsCards from './Cards.jsx';
import TeacherPostsToolbar from './Toolbar.jsx';

const TeacherPostsView = React.createClass({

  // Lifecycle

  getInitialState() {
    return { skip: 0, questionsCount: 0 };
  },

  componentWillMount() {
    this.getQuestionsCount();
  },

  // Methods

  getQuestionsCount() {
    Meteor.call(
      'PublicPostsCount',
      _.pick(this.props, ['text', 'subjects', 'tags', 'course']),
      (err, questionsCount) =>
        err ? snack('Erro ao buscar questões') : this.setState({ questionsCount })
    );
  },

  // handles

  handleSkipLess() {
    const { skip } = this.props;
    FlowRouter.setQueryParams({ skip: skip - 1 });
  },

  handleSkipAdd() {
    const { skip } = this.props;
    FlowRouter.setQueryParams({ skip: skip + 1 });
  },

  // Render

  render() {
    const { ready, posts, query, skip=0 } = this.props;
    const { questionsCount } = this.state;

    return (
      <div className='ui container' >

        <Layout.Bar title='Posts' />

        <TeacherPostsToolbar {...this.props} />

        {
          !_.every(ready)
          ? <LinearProgress/>
          : <TeacherPostsCards {...this.props} />
        }

        <PublicMiscPagination
          size={50}
          page={skip}
          total={questionsCount}
          less={this.handleSkipLess}
          add={this.handleSkipAdd}
          length={_.get(posts, 'length')}
        />

      </div>
    );
  },
});

export default TeacherPostsView;

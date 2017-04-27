import React from 'react';
import { LinearProgress, FontIcon } from 'material-ui';
import { AutoComplete, MenuItem, FloatingActionButton } from 'material-ui';

import StudentPostsCards from './Cards.jsx';
import StudentPostsToolbar from './Toolbar.jsx';

const StudentPostsView = React.createClass({

  // Styles

  styles: {
    floatingButton: {
      className: 'ui right aligned basic segment',
      style: { position: 'fixed', bottom: '1em', right: '1em', zIndex: '1000' },
    },
  },

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

        <StudentPostsToolbar {...this.props} />

        {
          !_.every(ready)
          ? <LinearProgress/>
          : <StudentPostsCards {...this.props} />
        }

        <PublicMiscPagination
          size={50}
          page={skip}
          total={questionsCount}
          less={this.handleSkipLess}
          add={this.handleSkipAdd}
          length={_.get(posts, 'length')}
        />

        <div {...this.styles.floatingButton}>
          <FloatingActionButton
            children={<FontIcon className='material-icons'>add</FontIcon>}
            href={FlowRouter.path('StudentPostCreate')}
          />
        </div>

      </div>
    );
  },
});

export default StudentPostsView;

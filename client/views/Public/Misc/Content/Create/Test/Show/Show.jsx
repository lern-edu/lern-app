// Libs
import React from 'react';
import { CircularProgress } from 'material-ui';

// Views
import PublicContentCreateTestShowQuestion from './Test.jsx';

const PublicContentCreateTestShowView = React.createClass({

  // Lifecycle

  // Render

  render() {
    const { tests, ready, parent } = this.props;

    return (
      <div className='ui fluid grid' style={{ width: '100%' }}>

        {
          !_.every(ready)
          ? <CircularProgress size={60} thickness={7} />
          : _.map(tests, t =>
            <PublicContentCreateTestShowQuestion
              key={t._id} test={t} {..._.omit(this.props, ['tests', 'query'])}
            />
          )
        }

        <div className='row' >
          <PublicMiscPagination
            size={50}
            page={parent.state.skip}
            total={parent.state.testsCount}
            add={parent.handleSkipAdd}
            length={tests.length}
            less={parent.handleSkipLess}
          />
        </div>
      </div>
    );
  },
});

export default PublicContentCreateTestShowView;

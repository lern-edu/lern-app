// Libs
import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from 'material-ui';

// Views
import StudentAttemptByTagsData from './Data.jsx';
import StudentAttemptByTagsTitle from './Title.jsx';

const StudentAttemptByTagsView = React.createClass({
  /* Get Context
  */

  contextTypes: {
    user: PropTypes.object,
  },

  // Render

  render() {
    const { ready, test, attempt, course } = this.props;
    return (
      <div className='ui container'>

        {!_.every(ready) ? undefined :
          <Layout.Bar
            title={moment(attempt.finishedAt).format('LL')}
            crumbs={
              [
                {
                  label: test.name,
                  path: FlowRouter.path(
                    'StudentTest',
                    { testId: test._id }
                  ),
                },
              ]
            }
          />
        }

        <div className='ui basic segment'>

            {
              !_.every(ready) ? undefined : [
                <StudentAttemptByTagsTitle {...this.props} key='static'/>,
                <Divider key='divider0'/>,
                <StudentAttemptByTagsData {...this.props} {...this.context} key='grades'/>,
              ]
            }

        </div>

      </div>
    );
  },
});

export default StudentAttemptByTagsView;

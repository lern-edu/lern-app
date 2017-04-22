import React from 'react';
import { RaisedButton } from 'material-ui';

const TeacherTestShowByTagsTitle = React.createClass({

  handleTestStart() {
    const { test, attempts } = this.props;
    const attempt = _.find(attempts, { test: test._id, finished: null });
    if (attempt) {
      snack('Boa sorte!');
      FlowRouter.go('StudentAttemptStart', { testId: test._id });
    } else {
      Meteor.call('StudentAttemptStart', test._id, err => {
        if (err) {
          console.log(err);
          snack('Algo deu errado', 'orange warning');
        } else {
          snack('Boa sorte!');
          FlowRouter.go('StudentAttemptStart', { testId: test._id });
        }
      });
    }
  },

  render() {
    const { test, subjects } = this.props;

    return (
      <div className='ui basic segment' style={{ marginBottom: 0 }}>
        <h1 className='ui header' style={{ marginTop: 0 }}>
          <div className='content'>
            {test.name}
            <div className='sub header'>
              {_.map(test.subjects, s => _.get(_.find(subjects, { _id: s }), 'name')).join(' ')}
            </div>
          </div>
        </h1>
      </div>
    );
  },
});

export default TeacherTestShowByTagsTitle;

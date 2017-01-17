// Libs
import React from 'react';
import { Divider, Paper, LinearProgress } from 'material-ui';

// Views
import AdminTestHeader from './Header.jsx';
import AdminTestActions from './Actions.jsx';

AdminTestView = React.createClass({
  mixins: [ReactMeteorData],

  /* Reactive Data Fetching
  */

  getMeteorData() {
    const { testId } = this.props;

    const handles = {
      test: Meteor.subscribe('AdminTests', { testId },
        { subjects: true, tags: true, questions: true, course: true }),
    };

    const data = {
      ready: _.mapValues(handles, h => h.ready()),
      test: _.first(Fetch.General.tests(testId).fetch()),
    };

    data.subjects = data.test && data.test.findSubjects().fetch();
    data.tags = data.test && data.test.findTags().fetch();
    data.questions = data.test && data.test.findQuestions().fetch();
    data.course = data.test && data.test.findCourse().fetch();
    data.documents = data.test && _.first(data.test.findDocuments().fetch());

    return data;
  },

  /* Render
  */

  render() {
    const { ready, test } = this.data;
    return (
      <div className='ui container'>

        <Layout.Bar
          title={_.get(test, 'name')}
          crumbs={[{ label: 'Provas', path: 'AdminTests' }]} />

        <Paper>
          {!_.every(ready) ? <LinearProgress/> : [
            <AdminTestHeader key='header' {...this.data} />,
            <Divider key='d0'/>,
            <AdminTestActions key='actions' {...this.data} />,
          ]}
        </Paper>

      </div>
    );
  },
});

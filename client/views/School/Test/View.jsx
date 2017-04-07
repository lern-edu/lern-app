// Libs
import React from 'react';
import { Divider, Paper, LinearProgress } from 'material-ui';

// Views
import SchoolTestHeader from './Header.jsx';
import SchoolTestActions from './Actions.jsx';
import SchoolTestForm from './Form/index.jsx';

SchoolTestView = React.createClass({
  mixins: [ReactMeteorData],

  /* Reactive Data Fetching
  */

  getMeteorData() {
    const { testId } = this.props;

    const handles = {
      test: Meteor.subscribe('SchoolTests', { testId },
        { subjects: true, tags: true, questions: true, course: true }),
      subjects: Meteor.subscribe('PublicSubjects'),
    };

    const data = {
      ready: _.mapValues(handles, h => h.ready()),
      subjects: Fetch.Public().subjects().fetch(),
      test: _.first(Fetch.General.tests(testId).fetch()),
    };

    data.tags = data.test && data.test.findTags().fetch();
    data.questions = data.test && data.test.findQuestions().fetch();
    data.course = data.test && data.test.findCourse().fetch();
    data.documents = data.test && _.first(data.test.findDocuments().fetch());

    return data;
  },

  /* Render
  */

  render() {
    const { ready, test, subjects } = this.data;
    return (
      <div className='ui container'>

        <Layout.Bar
          title={_.get(test, 'name')}
          crumbs={[{ label: 'Provas', path: 'SchoolTests' }]} />

        <Paper>
          {!_.every(ready) ? <LinearProgress/> : [
            <SchoolTestHeader key='header' {...this.data} />,
            <Divider key='d0'/>,
            <SchoolTestForm key='question' doc={test} subjects={subjects} />,
            <Divider key='d1'/>,
            <SchoolTestActions key='actions' {...this.data} />,
          ]}
        </Paper>

      </div>
    );
  },
});

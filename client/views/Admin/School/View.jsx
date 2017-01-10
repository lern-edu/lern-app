import React from 'react';
import { LinearProgress, Paper, Divider } from 'material-ui';

AdminSchoolView = React.createClass({
  mixins: [ReactMeteorData],

  /* Reactive Data Fetching
  */

  getMeteorData() {
    const { schoolId } = this.props;

    const handles = {
      course: Meteor.subscribe('AdminSchoolCourses', { schoolId }),
      users: Meteor.subscribe('AdminSchoolUsers', schoolId),
    };

    const data = {
      ready: _.mapValues(handles, h => h.ready()),
    };

    return data;
  },

  /* Render
  */

  render() {
    const { ready, course } = this.data;

    return (
      <div className='ui container'>

        <Layout.Bar
          title={_.get(course, 'name')}
          crumbs={[{ label: 'Escolas', path: 'AdminPlans' }]} />

        <Paper>
          {!_.every(ready) ? <LinearProgress/> : [
            // <AdminSchoolHeader key='header' {...this.data}/>,
            <Divider key='d0'/>,
            // <AdminSchoolList key='List' {...this.data}/>,
          ]}
        </Paper>

      </div>
    );
  },
});

import React from 'react';

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
          crumbs={[
            { label: 'Escolas', path: 'AdminPlans' },
          ]} />

        <MUI.Paper>
          {!_.every(ready) ? <MUI.LinearProgress/> : [
            // <AdminSchoolHeader key='header' {...this.data}/>,
            <MUI.Divider key='d0'/>,
            // <AdminSchoolList key='List' {...this.data}/>,
          ]}
        </MUI.Paper>

      </div>
    );
  },
});

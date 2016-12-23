import React from 'react';

StudentTestsView = React.createClass({
  mixins: [ReactMeteorData],

  /* Reactive Data Fetching
  */

  getMeteorData() {
    const userId = Meteor.userId();

    const handles = {
      tests: Meteor.subscribe('StudentTests', {}, { attempts: true }),
      plans: Meteor.subscribe('PublicPlans'),
    };

    return {
      ready: _.mapValues(handles, h => h.ready()),
      subjects: Fetch.General.subjects().fetch(),
      tags: Fetch.General.tags().fetch(),
      tests: Fetch.Student(userId).tests().fetch(),
      attempts: Fetch.General.attempts().fetch(),
      plans: Fetch.Public().plans().fetch(),
    };
  },

  /* Render
  */

  render() {
    const { ready, plans } = this.data;
    const { active='todo' } = this.props;
    const planName = _.get(_.find(plans, { _id: Meteor.user().getPlan() }), 'name');
    return (
      <div>
        <Layout.Bar
          title={`Meu Plano de Estudo ${planName ? planName : ''}`}
        />

        <div className='ui centered grid'>

          <div className='eight wide computer sixteen wide table column'>
            {!_.every(ready) ? <MUI.CircularProgress /> :
              <div>
                <StudentTestsToolbar active={active}/>
                <StudentTestsList {...this.data} active={active}/>
              </div>
            }
          </div>

        </div>
      </div>
    );
  },
});

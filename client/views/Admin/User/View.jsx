// Libs
import React from 'react';
import { LinearProgress } from 'material-ui';

// Views
import AdminUserForm from './Form/Form.jsx';

AdminUserView = React.createClass({
  mixins: [ReactMeteorData],

  // lifecycle

  getMeteorData() {
    const { userId } = this.props;

    const handles = {
      users: Meteor.subscribe('AdminUsers', { $or: [{ _id: userId }, { roles: 'school' }] }),
    };

    return {
      ready: _.mapValues(handles, h => h.ready()),
      user: _.first(Fetch.General.users(userId).fetch()),
      schools: Fetch.General.users({ roles: 'school' }).fetch(),
      name: _.get(this, 'context.user.profile.name'),
    };
  },

  render() {
    const { data: { ready, user, schools } } = this;

    return (
      <div>
        <Layout.Bar
          title={_.get(user, 'profile.name')}
          crumbs={[{ label: 'Usuários', path: 'AdminUsers' }]} />

        <div className='ui centered grid'>
          <div className='ten wide computer sixteen wide tablet column'>
            {!_.every(ready) ? <LinearProgress/> :
              <AdminUserForm doc={user} schools={schools} />}
          </div>
        </div>
      </div>
    );
  },
});

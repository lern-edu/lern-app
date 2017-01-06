import React from 'react';

AdminHomeUsers = React.createClass({

  /* Render
  */

  render() {
    const { ready, users } = this.props;

    const schools = _.filter(users, user => _.includes(user.roles, 'school'));

    return (
      <div className='ui basic segment'>

        <div className='ui basic vertical segment'>
          <Semantic.Button
            tag='a'
            href={FlowRouter.path('AdminUserCreate')}
          >Novo Usuário</Semantic.Button>
        </div>

        <div className='ui basic vertical segment'>
          <div className='ui four cards cards'>
            {!ready.users ? <div className='ui active inline laoder' /> :
              _.map(schools, school =>
                <AdminHomeUsersCard school={school} {...this.props} key={school._id} />
              )
            }
          </div>
        </div>

      </div>
    );
  },
});

import React from 'react';
import { List, ListItem, FontIcon, Styles } from 'material-ui';
import { darkBlack } from 'material-ui/styles/colors';

const AdminUsersList = React.createClass({
  // Lifecycle

  getInitialState() {
    const { users } = this.props;

    const group = _.groupBy(_.filter(users, ({ roles, profile={} }) =>
      (!_.includes(roles, 'school', 'admin')) && !_.isEmpty(profile)),
      ({ profile: { schools }={} }) => _.first(schools));

    return { group };
  },

  // Handlers

  handleGo({ currentTarget }) {
    FlowRouter.go('AdminUser', { userId: currentTarget.getAttribute('data-key') });
  },

  // Render

  render() {
    const { state: { group }, props: { courses, users, query } } = this;

    return <List>
      {_.map(_.keys(group), k => {
        const school = _.find(users, { _id: k });
        return <ListItem
         key={_.get(school, '_id') || k}
         data-key={_.get(school, '_id')}
         onTouchTap={this.handleGo}
         leftAvatar={<FontIcon className='material-icons'>account_balance</FontIcon>}
         primaryText={_.get(school, 'profile.name') || 'Sem escola'}
         secondaryText={<p>
           <span style={{ color: darkBlack }}>{_.get(school, 'emails[0]address')}
           </span> -- {_.get(school, 'emails[0]verified') ? 'verificado' : 'não verificado'}
           -- {_.get(group, `${k}.length`)} usuários
         </p>}
         nestedItems={_.map(_.get(group, k), ({ _id, profile: { name }, roles, emails }) =>
         (!_.isEmpty(query)
            && (!_.deburr(name).includes(_.deburr(query))
            && !_.includes(_.map(emails, 'address'), query))
         ) ? undefined : <ListItem
           key={_id}
           data-key={_id}
           primaryText={name}
           onTouchTap={this.handleGo}
           secondaryText={`${_.get(emails, '[0]address')}
             -- ${_.get(emails, '[0]verified') ? 'verificado' : 'não verificado'}`}
           leftIcon={<FontIcon className='material-icons'>
             {_.includes(roles, 'teacher') ? 'local_library' : 'school'}</FontIcon>} />
          )}
          secondaryTextLines={2} />;
      })}
    </List>;
  },
});

export default AdminUsersList;

// Libs
import React from 'react';
import { List, ListItem, FontIcon, RaisedButton, } from 'material-ui';
import { AutoComplete, MenuItem, Paper } from 'material-ui';

// Views
import AdminUserEmails from './Emails.jsx';
import AdminUserName from './Name.jsx';

const AdminUserForm = React.createClass({
  mixins: [AstroForm(Meteor.users.Schema, 'AdminUserSave')],

  /* Handlers
  */

  handleSchoolsChange({ value: { key } }, index) {
    if (!_.toString(index)) return;
    let { doc: { profile } } = this;
    profile.schools ? profile.schools.push(key) : profile.schools = [key];
    this.defaultHandler({ profile }, { doc: true });
  },

  handleSchoolsRemove({ currentTarget }) {
    let { doc: { profile } } = this;
    _.pull(profile.schools, currentTarget.getAttribute('data-key'));
    this.defaultHandler({ profile }, { doc: true });
  },

  handleSubmit() {
    let { doc: { profile } } = this;
    profile.school = _.first(profile.schools);
    this.defaultHandler({ profile }, { doc: true });
    this.defaultSubmit();
  },

  handleSubmitSuccess({ _id }) {
    snack('Usuário atualizado');
    FlowRouter.go('AdminUsers');
  },

  filter(searchText, _id) {
    if (!searchText) return;
    const { profile: { name } } = _.find(this.props.schools, { _id });
    return searchText !== '' &&
      name.toLowerCase().includes(searchText.toLowerCase());
  },

  // Render

  render() {
    const { props: { schools, },
      doc: { profile: { schools: schoolIds } }, doc,
      state: { valid, errors }, } = this;

    return (
      <div className='ui basic segment'>

        <div className='ui vertical basic segment'>
          <h2>Editar usuário</h2>
        </div>

        <AdminUserName {...doc} />

        <div className='row'>
          <div className='ui vertical basic segment'>
            <AutoComplete
              floatingLabelText='Escolas'
              onNewRequest={this.handleSchoolsChange}
              filter={this.filter}
              disableFocusRipple={false}
              dataSource={_.map(schools, ({ _id, profile: { name } }) =>
                  _.zipObject(['text', 'value'],
                  [_id, <MenuItem primaryText={name} key={_id} />])
              )} />
          </div>
          {schoolIds && schoolIds.length ?
            (<div className='ui vertical basic segment'>
              <Paper zDepth={1}>
                <List>
                  {_.map(schoolIds, schoolId =>
                      <ListItem
                        key={schoolId}
                        primaryText={_.get(_.find(schools, { _id: schoolId }), 'profile.name')}
                        leftIcon={<FontIcon
                          data-key={schoolId}
                          onTouchTap={this.handleSchoolsRemove}
                          className='material-icons'>
                          delete</FontIcon>}
                        initiallyOpen={false} />
                  )}
                </List>
              </Paper>
            </div>) : undefined}
        </div>

        <AdminUserEmails user={doc}/>

        <div className='ui right aligned basic segment'>
          <RaisedButton
            label='Terminar'
            disabled={valid ? false : true}
            primary={true}
            onTouchTap={this.handleSubmit} />
        </div>
      </div>
    );
  },
});

export default AdminUserForm;

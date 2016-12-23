import React from 'react';
import { AutoComplete, MenuItem, List, ListItem, FontIcon, Paper, } from 'material-ui';

PublicMiscSubjects = React.createClass({
  // Static data

  instructions: {
    subjects: 'Selecione 1 ou mais matérias',
  },

  /* Handlers
  */

  handleSubjectsChange(value, index, options) {
    if (_.isUndefined(index)) return;
    const { query=false, form: { doc: { subjects } }, form } = this.props;
    subjects.push(_.get(options[index], 'value.key'));
    this.refs.autoComplete.replaceState({ value: '' });
    if (query) form.defaultHandler({ subjects }, { query, doc: true });
    else form.defaultHandler({ subjects }, { doc: true });
  },

  handleSubjectsRemove({ currentTarget }) {
    const { form, form: { doc: { subjects } } } = this.props;
    _.pull(subjects, currentTarget.getAttribute('data-key'));
    form.defaultHandler({ subjects }, { doc: true });
  },

  filterSubjects(searchText, _id) {
    if (!searchText) return;
    const { name } = _.find(this.props.subjects, { _id });
    return searchText !== '' &&
      _.deburr(name).toLowerCase().includes(_.deburr(name).toLowerCase());
  },

  // Render

  render() {
    const { props: { form: { doc: { subjects: subjectIds } },
      subjects, error, }, instructions, } = this;

    return (
        <div className='row'>
          <div className='ui vertical basic segment'>
            <AutoComplete
              floatingLabelText='Matérias'
              ref='autoComplete'
              onNewRequest={this.handleSubjectsChange}
              filter={this.filterSubjects}
              disableFocusRipple={false}
              errorText={error ? instructions.subjects : null}
              dataSource={_.map(_.filter(
                subjects, ({ _id }) => !_.includes(subjectIds, _id)), ({ _id, name }) =>
                  _.zipObject(['text', 'value'],
                  [_id, <MenuItem primaryText={name} key={_id} />])
              )} />
          </div>
          {subjectIds && subjectIds.length ?
            (<div className='ui vertical basic segment'>
              <Paper zDepth={1}>
                <List>
                  {_.map(subjectIds, subjectId =>
                      <ListItem
                        key={subjectId}
                        primaryText={_.get(_.find(subjects, { _id: subjectId }), 'name')}
                        leftIcon={<FontIcon
                          data-key={subjectId}
                          onTouchTap={this.handleSubjectsRemove}
                          className='material-icons'>
                          delete</FontIcon>}
                        initiallyOpen={false} />
                  )}
                </List>
              </Paper>
            </div>) : undefined}
        </div>
    );
  },

});

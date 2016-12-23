import React from 'react';
import { AutoComplete, MenuItem, List, ListItem, FontIcon, Paper, } from 'material-ui';

AdminTestCreateFormSubjects = React.createClass({
  // Static data

  instructions: {
    subjects: 'Selecione 1 ou mais subjects',
  },

  componentDidMount() {
    this.props.form.defaultHandler({ subjects: [] }, { doc: true });
  },

  /* Handlers
  */

  handleSubjectsChange(value, index, options) {
    const { subjectIds=[], form } = this.props;
    subjectIds.push(_.get(options[index], 'value.key'));
    form.defaultHandler({ subjects: subjectIds }, { doc: true });
  },

  handleSubjectsRemove(event) {
    const { subjectIds, form } = this.props;
    _.pull(subjectIds, event.currentTarget.getAttribute('data-key'));
    form.defaultHandler({ subjects: subjectIds }, { doc: true });
  },

  // Render

  render() {
    const { subjectIds, subjects, error } = this.props;
    const { instructions } = this;

    return (
        <div className='row'>
          <div className='ui vertical basic segment'>
            <AutoComplete
              floatingLabelText='Matérias'
              filter={AutoComplete.fuzzyFilter}
              onNewRequest={this.handleSubjectsChange}
              searchText=''
              disableFocusRipple={false}
              dataSource={_.map(_.filter(
                subjects, t => !_.includes(subjectIds, t._id)), t => {
                  return {
                    text: t.name,
                    value: (
                      <MenuItem
                        primaryText={t.name}
                        key={t._id}
                      />
                    ),
                  };
                })}
              errorText={error ? instructions.subjects : null}
              name={instructions.subjects}
            />
          </div>
          {subjectIds && subjectIds.length ?
            (<div className='ui vertical basic segment'>
              <Paper zDepth={1}>
                <List>
                  {_.map(subjectIds, sid => {
                    const subject = _.first(_.filter(subjects,
                      t => t._id === sid));
                    return (
                      <ListItem
                        key={subject._id}
                        data-key={subject._id}
                        primaryText={subject.name}
                        leftIcon={<FontIcon className='material-icons'>
                          delete</FontIcon>}
                        initiallyOpen={false}
                        onTouchTap={this.handleSubjectsRemove}
                      />
                    );
                  })}
                </List>
              </Paper>
            </div>) : undefined}
        </div>
    );
  },

});

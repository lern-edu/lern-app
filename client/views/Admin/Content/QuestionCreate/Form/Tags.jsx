import React from 'react';
import { AutoComplete, MenuItem, List, ListItem, FontIcon, Paper, } from 'material-ui';

AdminQuestionCreateFormTags = React.createClass({
  // Static data

  instructions: {
    tags: 'Selecione 1 ou mais tags',
  },

  /* Handlers
  */

  handleTagsChange(value, index, options) {
    const { tagIds=[] } = this.props;
    tagIds.push(_.get(options[index], 'value.key'));
    this.props.form.defaultHandler({ tags: tagIds }, { query: true });
  },

  handleTagsRemove(event) {
    const { tagIds } = this.props;
    _.pull(tagIds, event.currentTarget.getAttribute('data-key'));
    this.props.form.defaultHandler({ tags: tagIds }, { query: true });
  },

  // Render

  render() {
    const { tagIds, tags } = this.props;
    const { instructions } = this;

    return (
        <div className='row'>
          <div className='ten wide column'>
            <AutoComplete
              floatingLabelText='Tags'
              filter={AutoComplete.fuzzyFilter}
              onNewRequest={this.handleTagsChange}
              searchText=''
              disableFocusRipple={false}
              dataSource={_.map(_.filter(
                tags, t => !_.includes(tagIds, t._id)), t => {
                  return {
                    text: t.text,
                    value: (
                      <MenuItem
                        primaryText={t.text}
                        key={t._id}
                      />
                    ),
                  };
                })}
              fullWidth={true}
              name={instructions.tags}
            />
          </div>
          {tagIds && tagIds.length ?
            (<div className='ten wide column'>
              <Paper zDepth={1}>
                <List>
                  {_.map(tagIds, tagId => {
                    const tag = _.first(_.filter(tags, t => t._id === tagId));
                    return (
                      <ListItem
                        key={tag._id}
                        data-key={tag._id}
                        primaryText={tag.text}
                        leftIcon={<FontIcon className='material-icons'>
                          delete</FontIcon>}
                        initiallyOpen={false}
                        onTouchTap={this.handleTagsRemove}
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

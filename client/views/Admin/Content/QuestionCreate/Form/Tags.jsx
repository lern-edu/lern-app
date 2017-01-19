import React from 'react';
import { AutoComplete, MenuItem, List, ListItem, FontIcon, Paper, } from 'material-ui';

const AdminQuestionCreateFormTags = React.createClass({
  // Static data

  instructions: {
    tags: 'Selecione 1 ou mais tags',
  },

  /* Handlers
  */

  handleTagsChange({ value: { key: tag } }) {
    const { tagIds=[], form } = this.props;
    tagIds.push(tag);
    form.defaultHandler({ tags: tagIds }, { query: true });
  },

  handleTagsRemove(event) {
    const { tagIds, form } = this.props;
    _.pull(tagIds, event.currentTarget.getAttribute('data-key'));
    form.defaultHandler({ tags: tagIds }, { query: true });
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
                tags, t => !_.includes(tagIds, t._id)), t => _.zipObject(
                  ['text', 'value'],
                  [t.text, <MenuItem primaryText={t.text} key={t._id} />]
                ))}
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

export default AdminQuestionCreateFormTags;

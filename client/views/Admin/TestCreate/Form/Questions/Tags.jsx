import React from 'react';
import { AutoComplete, MenuItem, List, ListItem, FontIcon, Paper, } from 'material-ui';

AdminTestCreateFormQuestionsTags = React.createClass({

  /* Handlers
  */

  handleTagsAdd(value, index, options) {
    this.props.tagsChange(_.get(options[index], 'value.key'), false);
  },

  handleTagsRemove(event) {
    this.props.tagsChange(event.currentTarget.getAttribute('data-key'), true);
  },

  // Render

  render() {
    const { tagIds, tags } = this.props;

    return (
        <div className='row'>
          <div className='ui vertical basic segment'>
            <AutoComplete
              floatingLabelText='Tags'
              filter={AutoComplete.fuzzyFilter}
              onNewRequest={this.handleTagsAdd}
              searchText=''
              disableFocusRipple={false}
              dataSource={_.map(_.filter(
                tags, t => !_.includes(tagIds, t._id)), t => {
                  return {
                    key: t._id,
                    text: t.text,
                    value: (
                      <MenuItem
                        primaryText={t.text}
                        key={t._id}
                      />
                    ),
                  };
                })}
            />
          </div>
          {tagIds && tagIds.length ?
            (<div className='ui vertical basic segment'>
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

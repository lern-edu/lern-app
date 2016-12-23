import React from 'react';
import { AutoComplete, MenuItem, List, ListItem, FontIcon, Paper, } from 'material-ui';

TeacherTestCreateFormQuestionsTags = React.createClass({

  /* Handlers
  */

  handleTagsAdd(value, index, options) {
    const { parent, parent: { state: { tags } } } = this.props;
    tags.push(_.get(options[index], 'value.key'));
    parent.setState({ tags });
  },

  handleTagsRemove({ currentTarget }) {
    const { parent, parent: { state: { tags } } } = this.props;
    _.pull(tags, currentTarget.getAttribute('data-key'));
    parent.setState({ tags });
  },

  // Render

  render() {
    const { tags, parent: {
      state: { tags: tagIds },
      props: { styles: { subItems } },
    }, } = this.props;

    return (
        <div>
          <div {...subItems}>
            <AutoComplete
              floatingLabelText='Tags'
              filter={AutoComplete.fuzzyFilter}
              onNewRequest={this.handleTagsAdd}
              searchText=''
              disableFocusRipple={false}
              dataSource={_.map(_.filter(
                tags, ({ _id }) => !_.includes(tagIds, _id)), ({ _id, text }) => _.zipObject(
                  ['text', 'value'],
                  [text, <MenuItem primaryText={text} key={_id} />])
              )} />
          </div>
          {tagIds && tagIds.length ?
            (<div {...subItems}>
              <Paper zDepth={2}>
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

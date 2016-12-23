import React from 'react';
import { AutoComplete, MenuItem, List, ListItem, FontIcon, Paper, } from 'material-ui';

PublicMiscTags = React.createClass({
  // Static data

  instructions: {
    tags: 'Selecione 1 ou mais tags',
  },

  /* Handlers
  */

  handleTagsChange(value, index, options) {
    if (_.isUndefined(index)) return;
    const { tags } = this.props.form.doc;
    tags.push(_.get(options[index], 'value.key'));
    this.refs.autoComplete.replaceState({ value: '' });
    this.props.form.defaultHandler({ tags }, { doc: true });
  },

  handleTagsRemove({ currentTarget }) {
    const { form, form: { doc: { tags } } } = this.props;
    _.pull(tags, currentTarget.getAttribute('data-key'));
    form.defaultHandler({ tags }, { doc: true });
  },

  filterTags(searchText, _id) {
    if (!searchText) return;
    const { text } = _.find(this.props.tags, { _id });
    return searchText !== '' &&
      _.deburr(text).toLowerCase().includes(_.deburr(searchText).toLowerCase());
  },

  // Render

  render() {
    const { props: { form: { doc: { tags: tagIds } }, tags, error }, instructions } = this;

    return (
        <div className='row'>
          <div className='ui vertical basic segment'>
            <AutoComplete
              floatingLabelText='Tags'
              ref='autoComplete'
              onNewRequest={this.handleTagsChange}
              filter={this.filterTags}
              disableFocusRipple={false}
              errorText={error ? instructions.tags : null}
              dataSource={_.map(_.filter(
                tags, ({ _id }) => !_.includes(tagIds, _id)), ({ _id, text }) =>
                  _.zipObject(['text', 'value'],
                  [_id, <MenuItem primaryText={text} key={_id} />])
              )} />
          </div>
          {tagIds && tagIds.length ?
            (<div className='ui vertical basic segment'>
              <Paper zDepth={1}>
                <List>
                  {_.map(tagIds, tagId =>
                      <ListItem
                        key={tagId}
                        primaryText={_.get(_.find(tags, { _id: tagId }), 'text')}
                        leftIcon={<FontIcon
                          data-key={tagId}
                          onTouchTap={this.handleTagsRemove}
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

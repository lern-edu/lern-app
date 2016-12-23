import React from 'react';
import { Toolbar, FontIcon, RaisedButton, ToolbarTitle, ToolbarGroup, SelectField, AutoComplete, MenuItem, IconMenu, IconButton, ToolbarSeparator } from 'material-ui';
import { grey400 } from 'material-ui/styles/colors';

StudentPostsToolbar = React.createClass({

  // Handlers

  handleUpdateFilter(_id, index, items) {
    const selected = _.get(items, index);

    if (!selected)
      FlowRouter.setQueryParams({ query: {} });
    else {
      const { text, value: { props: { 'data-type': key, primaryText } } } = selected;
      this.refs.autoComplete.replaceState({ value: primaryText });
      FlowRouter.setQueryParams({ query: { [key]: text } });
    }
  },

  handleMultipleFilters(event, multiple) {
    FlowRouter.setQueryParams({ multiple });
  },

  // Utilities

  filter(searchText, _id, { value: { props: { primaryText: text } } }) {
    if (!searchText) return;
    const normalize = _.deburr(searchText);
    return normalize !== '' && _.deburr(text).includes(normalize);
  },

  // Render

  render() {
    const { courses, subjects, tags, query, multiple=[] } = this.props;
    const selectedItem = _.find(_.union(tags, subjects, courses), { _id: _.sample(query) }) || {};
    return (
      <Toolbar>
        <div className='ui two column grid'>
          <ToolbarGroup className='sixteen wide column'>
            <AutoComplete
              hintText='Pesquisar'
              ref='autoComplete'
              searchText={selectedItem.name ? selectedItem.name : selectedItem.text}
              onNewRequest={this.handleUpdateFilter}
              fullWidth={true}
              filter={this.filter}
              dataSource={_.union(_.map(subjects, ({ _id, name }) =>
              _.zipObject(['text', 'value'],
                [_id, <MenuItem primaryText={name} data-type='subjects' key={_id} leftIcon={
                  <FontIcon className='material-icons'>subject</FontIcon>
                } />,
              ])), _.map(tags, ({ _id, text }) =>
              _.zipObject(['text', 'value'],
                [_id, <MenuItem primaryText={text} data-type='tags' key={_id} leftIcon={
                  <FontIcon className='material-icons'>local_offer</FontIcon>
                } />,
              ])), _.map(courses, ({ name, _id }) => _.zipObject(['text', 'value'],
                [_id, <MenuItem primaryText={name} data-type='course' key={_id} leftIcon={
                  <FontIcon className='material-icons'>group_work</FontIcon>
                } />,
              ])
              ))} />
          </ToolbarGroup>
          {/*<ToolbarGroup className='one wide column' style={{ paddingLeft: '0em' }}>
            <IconMenu
              multiple={true}
              value={multiple}
              onChange={this.handleMultipleFilters}
              iconButtonElement={<IconButton children={
                <FontIcon color={grey400} className='material-icons'>filter_list</FontIcon>} />}
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
              targetOrigin={{ horizontal: 'left', vertical: 'bottom' }}>
              <MenuItem key='old' value='old' primaryText='Mais antigos' />
              <MenuItem key='comments' value='comments' primaryText='Mais comentados' />
              {_.map(PostTypes.all('keys'), k =>
              <MenuItem key={k} value={k} primaryText={PostTypes.getName(k)} />)}
            </IconMenu>
          </ToolbarGroup>*/}
        </div>
      </Toolbar>
    );
  },
});

import React from 'react';
import { Toolbar, FontIcon, RaisedButton, ToolbarTitle, ToolbarGroup, SelectField, AutoComplete, MenuItem, IconMenu, IconButton, ToolbarSeparator, Styles } from 'material-ui';
import { grey400 } from 'material-ui/styles/colors';

TeacherTestsToolbar = React.createClass({

  // Static data

  styles: {
    iconButton: {
      iconButtonElement: <IconButton children={
        <FontIcon color={grey400} className='material-icons'>filter_list</FontIcon>} />,
      anchorOrigin: { horizontal: 'left', vertical: 'bottom' },
      targetOrigin: { horizontal: 'left', vertical: 'bottom' },
    },
  },

  filters: {
    ascending: 'Mais recentes',
    descending: 'Mais antigos',
  },

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

  handleOrderChange(event, e1, e2) {
    console.log(event, e1, e2);
    // FlowRouter.setQueryParams({ multiple });
  },

  // Utilities

  filter(searchText, _id, { value: { props: { primaryText: text } } }) {
    if (!searchText) return;
    const normalize = _.deburr(searchText);
    return normalize !== '' && _.deburr(text).includes(normalize);
  },

  // Render

  render() {
    const { courses, subjects, tags, query:
        { text, order='ascending', course, subjects: subject, tag: tag }={}, } = this.props;
    const { styles: { iconButton }, filters } = this;

    return (
      <Toolbar>
        <div className='ui two column grid'>
          <ToolbarGroup className='fifteen wide column'>
            <AutoComplete
              hintText='Pesquisar'
              ref='autoComplete'
              onNewRequest={this.handleUpdateFilter}
              fullWidth={true}
              filter={this.filter}
              maxSearchResults={5}
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
          <ToolbarGroup className='one wide column' style={{ paddingLeft: '0em' }}>
            <IconMenu onChange={this.handleOrderChange} {...iconButton} value={order} >
              {_.map(filters, (label, key) =>
              <MenuItem key={key} value={key} primaryText={label} />)}
            </IconMenu>
          </ToolbarGroup>
        </div>
      </Toolbar>
    );
  },
});

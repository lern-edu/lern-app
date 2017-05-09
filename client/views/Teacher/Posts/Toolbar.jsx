import React from 'react';
import { Paper } from 'material-ui';
import { AutoComplete, MenuItem } from 'material-ui';
import { Toolbar, FontIcon, Chip } from 'material-ui';

const TeacherPostsToolbar = React.createClass({

  // Lifecycle

  getInitialState() {
    return { searchText: '' };
  },

  // Handlers

  handleUpdateFilter(selected, index) {
    if (index === -1)
      FlowRouter.setQueryParams({ text: selected });
    else {
      const { text, value: { props: { 'data-type': key } } } = selected;
      const value = _.get(this.props, key) || [];
      value.push(text);
      FlowRouter.setQueryParams({ [key]: _.uniq(value) });
    }

    this.setState({ searchText: '' });
  },

  handleRequestDelete(key, id) {
    if (key === 'text')
      FlowRouter.setQueryParams({ text: null });
    else {
      const values = _.get(this, `props.${key}`);
      _.pull(values, id);
      FlowRouter.setQueryParams({ [key]: _.isEmpty(values) ? null : values });
    }
  },

  handleInput(searchText) {
    this.setState({ searchText });
  },

  // Utilities

  filter(searchText, _id, { value: { props: { primaryText: text } } }) {
    if (!searchText) return;
    const normalize = _.lowerCase(_.deburr(searchText));
    return normalize !== '' && _.lowerCase(_.deburr(text)).includes(normalize);
  },

  // Render

  render() {
    const { _courses, _subjects, _tags } = this.props;
    const { searchText } = this.state;

    return (
      <div>
        <Toolbar>
          <AutoComplete
            hintText='Pesquisar'
            searchText={searchText}
            maxSearchResults={7}
            fullWidth={true}
            onNewRequest={this.handleUpdateFilter}
            onUpdateInput={this.handleInput}
            fullWidth={true}
            filter={this.filter}
            dataSource={
              _.union(

                _.map(_subjects, ({ _id, name }) =>
                  _.zipObject(
                    ['text', 'value'],
                    [
                      _id,
                      <MenuItem
                        key={_id}
                        primaryText={name}
                        data-type='subjects'
                        leftIcon={<FontIcon className='material-icons'>subject</FontIcon>}
                      />,
                    ]
                  )
                ),

                _.map(_tags, ({ _id, text }) =>
                  _.zipObject(
                    ['text', 'value'],
                    [
                      _id,
                      <MenuItem
                        primaryText={text}
                        data-type='tags'
                        key={_id}
                        leftIcon={<FontIcon className='material-icons'>local_offer</FontIcon>}
                      />,
                    ]
                  )
                ),

                _.map(_courses, ({ name, _id }) =>
                  _.zipObject(
                    ['text', 'value'],
                    [
                      _id,
                      <MenuItem
                        primaryText={name}
                        data-type='course'
                        key={_id}
                        leftIcon={<FontIcon className='material-icons'>group_work</FontIcon>}
                      />,
                    ]
                  )
                )

              )
            }
          />
        </Toolbar>

        <Paper style={{ display: 'flex', flexWrap: 'wrap' }}>
          {
            _.map(
              _.pick(this.props, ['tags', 'subjects', 'course']),
              (values, key) =>
                _.map(values, _id =>
                  <Chip
                    key={_id}
                    style={{ margin: 4 }}
                    onRequestDelete={() => this.handleRequestDelete(key, _id)}
                  >
                    {
                      _.get(
                        _.find(
                          _.get(this, `props._${key}${key === 'course' ? 's' : ''}`),
                          { _id }
                        ),
                        key === 'tags' ? 'text' : 'name'
                      )
                    }
                  </Chip>
                )
            )
          }
          {
            !this.props.text
            ? undefined
            : <Chip
              key='text'
              style={{ margin: 4 }}
              onRequestDelete={() => this.handleRequestDelete('text')}
            >
              {_.get(this, 'props.text')}
            </Chip>
          }
        </Paper>

      </div>
    );
  },
});

export default TeacherPostsToolbar;

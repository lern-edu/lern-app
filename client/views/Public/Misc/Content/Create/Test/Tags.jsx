import React from 'react';
import { AutoComplete, MenuItem } from 'material-ui';

const PublicContentCreateTestTagsView = React.createClass({

  // Handlers

  handleTag({ text: tagText, value }, index) {
    const tagsIds = _.get(value, 'key');
    if (tagsIds) this.props.parent.setState({ tagsIds: [tagsIds], tagText });;
  },

  // render

  render() {
    const { subjects, tag, tags, tagText } = this.props;

    return (
      <AutoComplete
        searchText={tagText}
        maxSearchResults={5}
        floatingLabelText='Tags'
        menuStyle={{ width: '500px' }}
        onNewRequest={this.handleTag}
        filter={AutoComplete.fuzzyFilter}
        targetOrigin={{ vertical: 'top', horizontal: 'left' }}
        dataSource={_.map(tags, ({ text, _id, subject }) =>
            _.zipObject(['text', 'value'], [
            text,
            <MenuItem
              key={_id}
              primaryText={text}
              innerDivStyle={{ width: '500px' }}
              secondaryText={_.get(
                _.find(subjects, { _id: subject }), 'name')} />,
          ])
        )} />
    );
  },
});

export default PublicContentCreateTestTagsView;

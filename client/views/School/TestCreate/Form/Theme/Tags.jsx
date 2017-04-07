// Libs
import React from 'react';
import { AutoComplete, Chip, MenuItem, Toggle } from 'material-ui';

// View

const SchoolTestCreateFormThemeTags = React.createClass({

  // Handlers

  handleAllTags() {
    const { form, tags, form: { state: { allTags } } } = this.props;
    if (!allTags)
      form.defaultHandler({ tags: _.map(tags, '_id') }, { doc: true });
    else form.defaultHandler({ tags: [] }, { doc: true });
    form.setState({ allTags: !allTags });
  },

  handleRequestDelete(tag) {
    const tags = this.props.form.doc.get('tags');
    _.pull(tags, tag);
    this.props.form.defaultHandler({ tags }, { doc: true });
  },

  handleTagAdd({ value }, index) {
    const tag = _.get(value, 'key');
    if (!tag) return;
    const tags = this.props.form.doc.get('tags');
    tags.push(tag);
    this.props.form.defaultHandler({ tags }, { doc: true });
  },

  /* Render
  */

  render() {
    const { form, done, tags, subjects, errors } = this.props;
    const { allTags } = form.state;
    return (
      <div>

        <div className='row'>
          <AutoComplete
            onNewRequest={this.handleTagAdd}
            floatingLabelText='Tags'
            filter={AutoComplete.fuzzyFilter}
            errorText={errors.tags}
            menuStyle={{ width: '500px' }}
            targetOrigin={{ vertical: 'top', horizontal: 'left' }}
            dataSource={_.map(_.filter(tags, ({ _id }) =>
                !_.includes(form.doc.get('tags'), _id)
              ), ({ text, _id, subject }) => _.zipObject(['text', 'value'], [
                text,
                <MenuItem
                  key={_id}
                  primaryText={text}
                  innerDivStyle={{ width: '500px' }}
                  secondaryText={_.get(
                    _.find(subjects, { _id: subject }), 'name')} />,
              ])
            )}
            maxSearchResults={5} />
        </div>

        <div className='row'>
          <Toggle
            toggled={allTags}
            label='Selecionar todas as tags das matérias'
            onToggle={this.handleAllTags}
            style={{ marginBottom: 16 }} />
        </div>

        {allTags ? undefined : <div className='row'>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {_.map(_.filter(tags, ({ _id }) =>
                _.includes(form.doc.get('tags'), _id)
              ), ({ text, _id }) =>
              <Chip
                key={_id}
                style={{ margin: 4 }}
                onRequestDelete={() => this.handleRequestDelete(_id)} >
                {text}
              </Chip>
            )}
          </div>
        </div>}

      </div>
    );
  },
});

export default SchoolTestCreateFormThemeTags;

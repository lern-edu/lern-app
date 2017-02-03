// Libs
import React from 'react';
import { AutoComplete, Chip } from 'material-ui';

// View

const PublicContentCreateQuestionCreateSubject = React.createClass({

  // Handlers

  handleSubjectAdd({ text, value }, index) {
    if (!value) return;
    this.props.form.defaultHandler({ subject: value, tags: [] }, { doc: true });
  },

  /* Render
  */

  render() {
    const { form, subjects, errors } = this.props;

    return (
      <div>

        <div className='row'>
          <AutoComplete
            onNewRequest={this.handleSubjectAdd}
            floatingLabelText='Matéria'
            filter={AutoComplete.fuzzyFilter}
            errorText={errors.subject}
            dataSource={_.map(_.filter(subjects, ({ _id }) =>
                !_.includes(form.doc.get('subjects'), _id)
              ), s => _.zipObject(['text', 'value'],
              [s.name, s._id])
            )}
            maxSearchResults={5} />
        </div>

        <div className='row'>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {_.map(_.filter(subjects, ({ _id }) =>
                _.includes(form.doc.get('subjects'), _id)
              ), ({ name, _id }) =>
              <Chip
                key={_id}
                style={{ margin: 4 }}
                onRequestDelete={() => this.handleRequestDelete(_id)} >
                {name}
              </Chip>
            )}
          </div>
        </div>

      </div>
    );
  },
});

export default PublicContentCreateQuestionCreateSubject;

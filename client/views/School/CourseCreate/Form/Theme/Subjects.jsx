// Libs
import React from 'react';
import { AutoComplete, Chip } from 'material-ui';

// View

const SchoolCourseCreateFormThemeSubjects = React.createClass({

  // Handlers

  handleRequestDelete(subject) {
    const { tags: dataTags, form } = this.props;
    const subjects = form.doc.get('subjects');
    const tags = form.doc.get('tags');
    _.pull(subjects, subject);
    _.pull(tags, ..._.map(_.filter(dataTags, t => t.subject == subject), '_id'));
    form.defaultHandler({ subjects, tags }, { doc: true });
  },

  handleSubjectAdd({ text, value }, index) {
    if (!value) return;
    const subjects = this.props.form.doc.get('subjects');
    subjects.push(value);
    this.props.form.defaultHandler({ subjects }, { doc: true });
    this.props.form.setState({ allTags: false });
  },

  /* Render
  */

  render() {
    const { form, done, subjects, errors } = this.props;

    return (
      <div>

        <div className='row'>
          <AutoComplete
            onNewRequest={this.handleSubjectAdd}
            floatingLabelText='Matéria'
            filter={AutoComplete.fuzzyFilter}
            errorText={errors.subjects}
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

export default SchoolCourseCreateFormThemeSubjects;

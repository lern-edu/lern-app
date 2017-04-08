// Libs
import React from 'react';
import { RaisedButton, TextField, MenuItem } from 'material-ui';

const SchoolCourseForm = React.createClass({

  // Handlers

  handleInput({ currentTarget, target: { value } }) {
    this.props.form.defaultHandler({
      [currentTarget.getAttribute('name')]: value,
    }, { doc: true });
  },

  /* Render
  */

  render() {
    const { form, done } = this.props;

    return (
      <div className='ui basic segment' style={{ marginLeft: '5px' }} >
        <div className='ui grid'>

          <div className='row'>
            <TextField
              value={form.doc.get('name') || ''}
              floatingLabelText='Nome'
              name='name'
              errorText={_.get(form.state.errors, 'name')}
              onInput={this.handleInput}  />
          </div>

          <div className='row'>
            <div className='sixteen wide column'>
              <PublicContentCreate
                field='info'
                schema={Courses.ContentSchema}
                contentTypes={ContentTypes}
                form={form}
                course={form.doc.get('_id')}
              />
            </div>
          </div>

          <div className='row'>
            {_.map(form.doc.get('info'), (s, i) =>
              <div className='sixteen wide column' key={i} >
                <PublicContentShow
                  schema={Courses.ContentSchema}
                  field='info'
                  form={form}
                  index={i}
                  doc={s}
                />
            </div>)}
          </div>

        </div>
      </div>
    );
  },
});

export default SchoolCourseForm;

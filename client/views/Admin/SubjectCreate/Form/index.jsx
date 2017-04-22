// Libs
import React from 'react';
import { TextField, RaisedButton, Paper } from 'material-ui';

const AdminSubjectCreateForm = React.createClass({
  mixins: [AstroForm(Subjects.Schema, 'AdminSubjectSave')],

  // Lifecycle

  getinitialState() {
    return { waitingCallback: false };
  },

  // Handlers

  handleName(event, name) {
    this.defaultHandler({ name }, { doc: true });
  },

  handleSubmit() {
    this.setState({ waitingCallback: true });
    this.defaultSubmit();
  },

  handleSubmitError() {
    this.setState({ waitingCallback: false });
    snack('Problemas ao criar matéria');
  },

  handleSubmitSuccess({ _id }) {
    console.log(`Subject created: ${_id}`);
    this.setState({ waitingCallback: false });
    snack('Matéria criada');
    FlowRouter.go('AdminSubject', { subjectId: _id });
  },

  /* Render
  */

  render() {
    const { errors, valid } = this.state;

    return (
      <div className='ui basic segment'>

        <div className='ui grid'>

          <div className='row'>
            <TextField
              value={this.doc.get('name') || ''}
              floatingLabelText='Nome'
              errorText={_.get(errors, 'name')}
              onChange={this.handleName}
            />
          </div>

          <div className='row'>
            <div className='sixteen wide column' style={{ padding: 0 }} >
              <PublicContentCreate
                field='info'
                schema={Subjects.ContentSchema}
                contentTypes={NoReferenceContentTypes}
                form={this}
              />
            </div>
          </div>

          <div className='row'>
            {
              _.map(this.doc.get('info'), (s, i) =>
                <Paper className='sixteen wide column' key={i} style={{ marginBottom: '1em' }} >
                  <PublicContentShow
                    schema={Subjects.ContentSchema}
                    field='info'
                    form={this}
                    index={i}
                    doc={s}
                  />
              </Paper>
              )
            }
          </div>

          <div className='row'>
            <RaisedButton
              label='Próximo'
              disabled={!valid}
              primary={true}
              onTouchTap={this.handleSubmit}
            />
          </div>

        </div>

      </div>
    );
  },
});

export default AdminSubjectCreateForm;

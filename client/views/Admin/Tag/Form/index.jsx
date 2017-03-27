// Libs
import React from 'react';
import { TextField, RaisedButton, Paper } from 'material-ui';

const AdminTagForm = React.createClass({
  mixins: [AstroForm(Tags.Schema, 'AdminTagSave')],

  // Lifecycle

  getinitialState() {
    return { waitingCallback: false };
  },

  componentDidMount() {
    this.doc.info = this.doc.info;
  },

  // Handlers

  handleName(event, text) {
    this.defaultHandler({ text }, { doc: true });
  },

  handleSubmit() {
    this.setState({ waitingCallback: true });
    this.defaultSubmit();
  },

  handleSubmitError() {
    this.setState({ waitingCallback: false });
    snack('Problemas ao atualizar tag');
  },

  handleSubmitSuccess({ _id }) {
    console.log(`Tag updated: ${_id}`);
    this.setState({ waitingCallback: false });
    snack('Tag atualizada');
  },

  /* Render
  */

  render() {
    const { errors, valid, waitingCallback } = this.state;

    return (
      <div className='ui grid'>

        <div className='row'>
          <TextField
            value={this.doc.get('text') || ''}
            floatingLabelText='Texto'
            errorText={_.get(errors, 'text')}
            onChange={this.handleName}
          />
        </div>

        <div className='row'>
          <div className='sixteen wide column' style={{ padding: 0 }} >
            <PublicContentCreate
              field='info'
              schema={Tags.ContentSchema}
              contentTypes={ContentTypes}
              form={this}
            />
          </div>
        </div>

        <div className='row'>
          {
            _.map(this.doc.get('info'), (s, i) =>
              <Paper className='sixteen wide column' key={i} style={{ marginBottom: '1em' }} >
                <PublicContentShow
                  schema={Tags.ContentSchema}
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
            label='Salvar'
            disabled={!valid || waitingCallback}
            primary={true}
            onTouchTap={this.handleSubmit}
          />
        </div>

      </div>
    );
  },
});

export default AdminTagForm;

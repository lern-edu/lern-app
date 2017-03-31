// Libs
import React from 'react';
import { TextField, Dialog, FlatButton, Paper } from 'material-ui';

const AdminSubjectsTagsForm = React.createClass({
  mixins: [AstroForm(Tags.Schema, 'AdminTagSave')],

  // Lifecycle

  getinitialState() {
    return { waitingCallback: false };
  },

  componentDidMount() {
    const { subject } = this.props;
    this.defaultHandler({ subject: subject._id }, { doc: true });
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
    snack('Problemas ao criar tag');
  },

  handleSubmitSuccess({ _id }) {
    console.log(`Tag created: ${_id}`);
    this.setState({ waitingCallback: false });
    this.handleClose();
    snack('Tag criada');
  },

  handleClose() {
    const { parent, subject } = this.props;
    parent.setState({ createTag: false });
    this.doc = new Tags.Schema({ subject: subject._id });
  },

  /* Render
  */

  render() {
    const { errors, valid, waitingCallback } = this.state;
    console.log(errors);
    return (
      <Dialog
        title='Criar Tag'
        actions={
          [
            <FlatButton
              label='Terminar'
              disabled={!valid || waitingCallback}
              primary={true}
              onTouchTap={this.handleSubmit}
            />,
            <FlatButton
              label='Cancelar'
              secondary={true}
              onTouchTap={this.handleClose}
            />,
          ]
        }
        modal={false}
        autoScrollBodyContent={true}
        contentStyle={{ width: '100%', maxWidth: 'none' }}
        open={this.props.open}
      >
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

        </div>
      </Dialog>
    );
  },
});

export default AdminSubjectsTagsForm;

// Libs
import React from 'react';
import { TextField, CardTitle, RaisedButton } from 'material-ui';
import { Card, CardActions, CardText, Paper } from 'material-ui';

const AdminSubjectsForm = React.createClass({
  mixins: [AstroForm(Subjects.Schema, 'AdminSubjectSave')],

  // Lifecycle

  getinitialState() {
    return { waitingCallback: false };
  },

  componentDidMount() {
    this.doc.info = this.doc.info;
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
    snack('Problemas ao atualizar matéria');
  },

  handleSubmitSuccess({ _id }) {
    console.log(`Subject updated: ${_id}`);
    this.setState({ waitingCallback: false });
    snack('Matéria atualizada');
  },

  /* Render
  */

  render() {
    const { errors, valid, waitingCallback } = this.state;

    return (
      <Card className='ui basic segment'>

        <CardTitle
          title='Matéria'
          subtitle='Veja e edite as informações da matéria'
          actAsExpander={true}
          showExpandableButton={true}
        />

        <CardText expandable={true}>
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

          </div>
        </CardText>

        <CardActions expandable={true}>
          <RaisedButton
            label='Salvar'
            disabled={!valid || waitingCallback}
            primary={true}
            onTouchTap={this.handleSubmit}
          />
        </CardActions>

      </Card>
    );
  },
});

export default AdminSubjectsForm;

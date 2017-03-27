import React from 'react';
import { TextField, RaisedButton, } from 'material-ui';

AdminTagEditForm = React.createClass({
  mixins: [AstroForm(Tags.Schema, 'AdminTagSave')],

  // Static data

  instructions: {
    text: 'Redija um enunciado com 4 ou mais letras',
  },

  /* Handlers
  */

  handleSubmitSuccess({ _id }) {
    const { subject: { _id: subjectId } } = this.props;
    console.log(`Tag updated: ${_id}`);
    snack('Tag atualizada!');
    FlowRouter.go('AdminSubject', { subjectId });
  },

  handleText({ target: { value } }) {
    this.defaultHandler({ text: value }, { doc: true });
  },

  handleSubmitError(error) {
    console.log(error);
    snack('Algo deu errado!');
  },

  // Render

  render() {
    const { state: { errors, valid }, props: { tag: { text } }, instructions } = this;
    return (
      <div className='ui basic segment'>

          <div className='ui vertical basic segment'>
            <h2>Editar tag</h2>
          </div>

          <div className='ui vertical basic segment'>
            <TextField
              floatingLabelText='Texto'
              value={text}
              fullWidth={true}
              hintText='Texto'
              errorText={errors.text ? instructions.text : undefined}
              onChange={this.handleText} />
          </div>

          <div className='ui right aligned basic segment'>
            <RaisedButton
              label='Terminar'
              disabled={valid ? false : true}
              primary={true}
              onTouchTap={this.defaultSubmit} />
          </div>

      </div>
    );
  },

});

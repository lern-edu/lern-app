import React from 'react';
import { TextField } from 'material-ui';

AdminQuestionCreateFormComplement = React.createClass({

  // Handlers

  handleText({ target: { value }, currentTarget }) {
    const { form, form: { doc: { complement={} } } } = this.props;
    form.defaultHandler({
      complement: _.assign(complement, { [currentTarget.getAttribute('data-key')]: value }),
    }, { doc: true });
  },

  // render

  render() {
    return (
      <div className='ten wide column'>

        <div className='row'>
          <div className='eight wide column'>Grupo</div>
          <div className='eight wide column'>
            <TextField
              floatingLabelText='Grupo'
              hintText='Grupo'
              fullWidth={true}
              data-key='group'
              onChange={this.handleText} />
          </div>
        </div>

        <div className='row'>
          <div className='eight wide column'>Nº enunciado</div>
          <div className='eight wide column'>
            <TextField
              floatingLabelText='Numero'
              hintText='Numero'
              fullWidth={true}
              data-key='enum'
              onChange={this.handleText} />
          </div>
        </div>

      </div>
    );
  },
});

// Libs
import React from 'react';
import { RaisedButton, TextField, MenuItem, SelectField } from 'material-ui';

const AdminTestCreateFormBasic = React.createClass({

  // Handlers

  handleInput({ currentTarget, target: { value } }) {
    this.props.form.defaultHandler({
      [currentTarget.getAttribute('name')]: value,
    }, { doc: true });
  },

  handleResolutionChange(event, index, resolution) {
    this.props.form.defaultHandler({ resolution }, { doc: true });
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
            <SelectField
              floatingLabelText='Resolução'
              value={form.doc.get('resolution')}
              errorText={_.get(form.state.errors, 'resolution')}
              onChange={this.handleResolutionChange} >
              {_.map(TestResolutionTypes.all('both'), (v, k) =>
                <MenuItem key={k} value={k} primaryText={v} />)}
            </SelectField>
          </div>

          <div className='row'>
            <div className='sixteen wide column'>
              <PublicContentCreate
                field='info'
                schema={Tests.ContentSchema}
                contentTypes={ContentTypes}
                form={form} />
            </div>
          </div>

          <div className='row'>
            {_.map(form.doc.get('info'), (s, i) =>
              <div className='sixteen wide column' key={i} >
                <PublicContentShow
                  schema={Tests.ContentSchema}
                  field='info'
                  form={form}
                  index={i}
                  doc={s} />
            </div>)}
          </div>

          <div className='row'>
            <RaisedButton
              label='Próximo'
              disabled={!done}
              primary={true}
              onTouchTap={form.nextStep} />
          </div>

        </div>
      </div>
    );
  },
});

export default AdminTestCreateFormBasic;

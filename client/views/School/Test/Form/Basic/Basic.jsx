// Libs
import React from 'react';
import { RaisedButton, TextField, MenuItem, SelectField } from 'material-ui';
import { Card, CardHeader, CardText } from 'material-ui';

const SchoolTestFormBasic = React.createClass({

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
            <Card className='sixteen wide column'>
              <CardHeader
                title='Informações'
                subtitle={`${form.doc.get('info').length} itens`}
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true}>

                <div className='ui grid'>

                  <div className='sixteen wide column'>
                    <PublicContentCreate
                      field='info'
                      schema={Tests.ContentSchema}
                      contentTypes={NoReferenceContentTypes}
                      form={form}
                    />
                  </div>

                  <div className='sixteen wide column'>
                    {_.map(form.doc.get('info'), (s, i) =>
                      <div style={{ width: '100%' }} key={i} >
                        <PublicContentShow
                          schema={Tests.ContentSchema}
                          field='info'
                          form={form}
                          index={i}
                          doc={s} />
                    </div>)}
                  </div>

                </div>
              </CardText>
            </Card>
          </div>

          <div className='row'>
            <Card className='sixteen wide column'>
              <CardHeader
                title='Ajuda'
                subtitle={`${form.doc.get('help').length} itens`}
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true}>

                <div className='ui grid'>

                  <div className='sixteen wide column'>
                    <PublicContentCreate
                      field='help'
                      schema={Tests.ContentSchema}
                      contentTypes={NoReferenceContentTypes}
                      form={form}
                    />
                  </div>

                  <div className='sixteen wide column'>
                    {_.map(form.doc.get('help'), (s, i) =>
                      <div style={{ width: '100%' }} key={i} >
                        <PublicContentShow
                          schema={Tests.ContentSchema}
                          field='help'
                          form={form}
                          index={i}
                          doc={s} />
                    </div>)}
                  </div>

                </div>
              </CardText>
            </Card>
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

export default SchoolTestFormBasic;

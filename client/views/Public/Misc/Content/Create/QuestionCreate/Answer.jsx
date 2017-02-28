// Libs
import React from 'react';
import { FlatButton, Dialog, Divider, RadioButtonGroup, RadioButton } from 'material-ui';
import { TextField, RaisedButton, SelectField, MenuItem } from 'material-ui';
import { Table, TableHeaderColumn, TableRow, TableHeader } from 'material-ui';
import { TableRowColumn, TableBody } from 'material-ui';

const PublicContentCreateQuestionCreateAnswer = React.createClass({

  // Static

  column: {
    className:
      'eight wide computer eight wide tablet sixteen wide mobile column',
  },

  // Handlers

  handleTypeChange(event, index, type) {
    const { form } = this.props;
    form.defaultHandler({ options: type != 'closed' ? null : [] },
      { doc: true });
    if (type == 'number')
      form.defaultHandler({ range: new Questions.RangeSchema() },
        { doc: true });
    else form.defaultHandler({ range: null }, { doc: true });
    form.defaultHandler({ type, answer: null }, { doc: true });
  },

  handleAnswerChange(answer) {
    this.props.form.defaultHandler({ answer }, { doc: true });
  },

  handleTextChange({ currentTarget }, value) {
    const name = currentTarget.getAttribute('name');
    this.props.form.defaultHandler({ [name]: value }, { doc: true });
  },

  handleRangeChange({ currentTarget }, value) {
    const field = currentTarget.getAttribute('name');
    const range = parseInt(value);
    if (range || value == '')
      this.props.form.defaultHandler({ [field]: range }, { doc: true });
    else return;
  },

  handleOptionRemove() {
    const { options, answer } = this.props.form.doc;
    _.pullAt(options, answer);
    this.props.form.defaultHandler({ options, answer: null }, { doc: true });
  },

  // render

  render() {
    const { form, images } = this.props;
    const { errors, valid } = form.state;

    return (
      <div className='sixteen wide column'>

        <div className='row'>
          <SelectField
            value={form.doc.get('type')}
            onChange={this.handleTypeChange} >
            {_.map(QuestionTypes.all('both'), (v, k) =>
              <MenuItem key={k} value={k} primaryText={v} />)}
          </SelectField>
        </div>

        <div className='row'>
          {_.get({
            open: <div className='sixteen wide column'>
              <TextField
                errorText={_.get(errors, 'answer')}
                value={form.doc.get('answer') || ''}
                floatingLabelText='Resposta'
                hintText='Resposta'
                multiLine={true}
                rows={4}
                fullWidth={true}
                name='answer'
                onChange={this.handleTextChange} />
              </div>,
            closed: <div className='sixteen wide column'>
              <PublicContentCreate
                field='options'
                schema={Questions.OptionSchema}
                contentTypes={QuestionOptionsContentTypes}
                form={form} />
              </div>,
            number: [<div {...this.column} key='range.min'>
              <TextField
                value={form.doc.get('range.min') || ''}
                floatingLabelText='Mínimo'
                hintText='Mínimo'
                name='range.min'
                onChange={this.handleRangeChange} />
              </div>,
              <div {...this.column} key='range.max'>
                <TextField
                  value={form.doc.get('range.max') || ''}
                  floatingLabelText='Máximo'
                  hintText='Máximo'
                  name='range.max'
                  onChange={this.handleRangeChange} />
                </div>,
            ],
          }, form.doc.get('type'))}
        </div>

        {form.doc.get('type') === 'closed' ?
          <div className='row' >
            <div className='sixteen wide column'>
              {/*<RadioButtonGroup
                onChange={this.handleAnswerChange}
                name='options'
                defaultSelected='not_light'>
                {_.map(form.doc.get('options'), (c, i) =>
                      <RadioButton
                        value={i}
                        key={i}
                        label={<PublicContentShow
                          field='options'
                          schema={Tests.PageContentSchema}
                          index={i}
                          form={form}
                          doc={c} />} />)}
              </RadioButtonGroup>*/}

              <Table onCellClick={this.handleAnswerChange}>
                <TableHeader>
                  <TableRow>
                    <TableHeaderColumn>Tipo</TableHeaderColumn>
                    <TableHeaderColumn>Conteúdo</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody deselectOnClickaway={false} >
                  {_.map(form.doc.get('options'), (op, index) => {
                    const text = op.text ? _.first(op.text.blocks).text
                      : <PublicContentShowImage
                        form={this}
                        imageId={op.image} />;
                    return (
                      <TableRow
                        key={op.text ? _.first(op.text.blocks).text : op.image}
                        selected={index === form.doc.get('answer')}>
                        <TableRowColumn>
                          {op.text ? 'Texto' : 'Imagem'}
                        </TableRowColumn>
                        <TableRowColumn>
                          {text}
                        </TableRowColumn>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <div className='ui right aligned grid'
                style={{ marginTop: '1rem' }}>
                <div className='sixteen wide column'
                  style={{ paddingBottom: 0, margin: '0.25rem' }}>
                  <FlatButton
                    label='Remover'
                    disabled={(form.doc.get('options') && form.doc.get('options').length) ? false : true}
                    secondary={true}
                    onTouchTap={this.handleOptionRemove} />
                </div>
              </div>
            </div>
          </div>
        : undefined }

      </div>
    );
  },
});

export default PublicContentCreateQuestionCreateAnswer;

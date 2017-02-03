// Libs
import React from 'react';
import { FlatButton, Dialog, Divider, RadioButtonGroup, RadioButton } from 'material-ui';
import { TextField, RaisedButton, SelectField, MenuItem } from 'material-ui';

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

  handleAnswerChange(event, answer) {
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

        <div className='row' >
          <div className='sixteen wide column'>
            <RadioButtonGroup
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
            </RadioButtonGroup>
          </div>
        </div>

      </div>
    );
  },
});

export default PublicContentCreateQuestionCreateAnswer;

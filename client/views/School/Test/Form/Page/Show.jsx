// Libs
import React from 'react';
import { FlatButton, Card, CardHeader, TextField } from 'material-ui';
import { CardText, CardActions, Divider, CardTitle } from 'material-ui';

const SchoolTestFormPageShow = React.createClass({
  mixins: [AstroForm(Tests.PageSchema)],

  // Handlers

  handleRemove() {
    const { index, form, form: { doc: { pages, questions } } } = this.props;
    _.pull(questions, ..._.map(_.get(pages, `[${index}].content`), 'question'));
    _.pullAt(pages, index);
    form.defaultHandler({ pages, questions }, { doc: true });
    this.props.updateQuestionsSelected();
  },

  handleTimeoutChange({ currentTarget }, value) {
    const timeout = parseInt(value);
    if (timeout || value == '')
      this.defaultHandler({ timeout }, { doc: true });
    else return;
  },

  /* Render
  */

  render() {
    const { form, index, doc: { content, timeout }, scored } = this.props;
    const { errors={} } = this.state;

    return (
      <Card>
        <CardHeader title={`Página ${index + 1}`} />
        <CardText>

          <div className='ui grid'>
            {_.map(content, (c, i) =>
                <div className='row' key={i}>
                  <div className='sixteen wide column'>
                    <PublicContentShow
                      field='content'
                      schema={Tests.PageContentSchema}
                      updateQuestionsSelected={this.props.updateQuestionsSelected}
                      scored={scored}
                      index={i}
                      form={this}
                      doc={c} />
                    <Divider/>
                </div>
              </div>
            )}
          </div>

        </CardText>
        <CardActions>
          {form.doc.get('timeoutType') != 'page' ? undefined :
            <TextField
              value={timeout || ''}
              floatingLabelText='Cronômetro'
              errorText={errors.timeout}
              onChange={this.handleTimeoutChange} />}
          <FlatButton
            onTouchTap={this.handleRemove}
            primary={true}
            label='Remover página' />
        </CardActions>

      </Card>
    );
  },
});

export default SchoolTestFormPageShow;

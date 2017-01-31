// Libs
import React from 'react';
import { FlatButton, Card, CardHeader } from 'material-ui';
import { CardText, CardActions, Divider, TextField } from 'material-ui';

// View
import AdminTestCreateFormPageCreateContentCreate from './Content/Create.jsx';
import AdminTestCreateFormPageCreatContentShow from './Content/Show.jsx';

const AdminTestCreateFormPageCreate = React.createClass({
  mixins: [AstroForm(Tests.PageSchema)],

  componentWillMount() {
    if (this.props.form.doc.get('timeoutType') == 'page')
      this.defaultHandler({ timeout: '' }, { doc: true });
  },

  // Handlers

  handleTimeoutChange({ currentTarget }, value) {
    const field = currentTarget.getAttribute('name');
    const timeout = parseInt(value);
    if (timeout || value == '')
      this.defaultHandler({ [field]: timeout }, { doc: true });
    else return;
  },

  handleSubmit() {
    const { form } = this.props;
    const pages = form.doc.get('pages');
    pages.push(_.clone(this.doc));
    form.defaultHandler({ pages }, { doc: true });
    snack('Página criada!');
    this.doc = new Tests.PageSchema();
    this.updateValidation();
    if (this.props.form.doc.get('timeoutType') == 'page')
      this.defaultHandler({ timeout: '' }, { doc: true });
  },

  /* Render
  */

  render() {
    const { form, subjects, questionsSelected, scored } = this.props;
    const { valid, errors={} } = this.state;

    const actualQuestionsSelected = _.union(questionsSelected,
      _.compact(_.map(this.doc.get('content'), 'question')));

    return (
      <Card>
        <CardHeader title='Nova página' />

        <CardText>
          <div className='ui grid'>

            <div className='row'>
              <div className='sixteen wide column'>
              {form.doc.get('timeoutType') == 'page' ?
                <TextField
                  value={this.doc.get('timeout') || ''}
                  floatingLabelText='Segundos'
                  errorText={errors.timeout}
                  name='timeout'
                  onChange={this.handleTimeoutChange} /> : undefined}
              </div>
            </div>

            <div className='row'>
              <AdminTestCreateFormPageCreateContentCreate
                scored={scored}
                questionsSelected={actualQuestionsSelected}
                form={this}
                subjects={subjects} />
            </div>

            <div className='row'>
              <div className='sixteen wide column'>
                <Divider/>
              </div>
            </div>

            {_.map(this.doc.get('content'), (s, i) =>
              <div className='row' key={i}>
                <div className='sixteen wide column'>
                  <AdminTestCreateFormPageCreatContentShow
                    index={i}
                    form={this}
                    content={s} />
                  <Divider/>
              </div>
            </div>)}

          </div>
        </CardText>

        <CardActions>
          <FlatButton
            onTouchTap={this.handleSubmit}
            disabled={!valid}
            primary={true}
            label='Adicionar página' />
        </CardActions>

      </Card>
    );
  },
});

export default AdminTestCreateFormPageCreate;

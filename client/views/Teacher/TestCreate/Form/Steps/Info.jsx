import React from 'react';
import { Paper, TextField, Checkbox, FlatButton } from 'material-ui';

TeacherTestCreateFormInfo = React.createClass({
  mixins: [Semantic.Transition('fly right')],

  // Static Data

  instructions: {
    name: 'Defina um nome com 4 ou mais letras',
    info: 'Defina uma informação com 4 ou mais letras',
  },

  // handlers

  handleFieldChange({ currentTarget, target: { value } }) {
    this.props.form.defaultHandler({ [currentTarget.getAttribute('data-name')]: value },
      { doc: true });
  },

  handleHasScoreChange(event, hasScores) {
    this.props.form.defaultHandler({ questions: [], scores: hasScores ? [] : null },
      { doc: true });
  },

  handleNext() {
    FlowRouter.setQueryParams({ tab: 'date' });
  },

  // render

  render() {
    const { props: { form,
    styles: { paper, subItems, next },
    form: {
      state: { errors },
      doc: { name, info, scores },
    }, subjects, tags, ready, }, instructions, } = this;

    return !_.every(ready.course) ?
      <div {...paper}>
        <MUI.LinearProgress/>
      </div> :
      <Paper {...paper}>
        <div {...subItems}>
          <h5>Defina as principais informações da atividade.</h5>
        </div>

        <div {...subItems}>
          <TextField
            hintText='Nome'
            floatingLabelText='Nome'
            data-name='name'
            value={name}
            errorText={errors.name ? instructions.name : undefined}
            onChange={this.handleFieldChange} />
        </div>

        <div {...subItems}>
          <TextField
            hintText='Informações'
            floatingLabelText='Informações'
            data-name='info'
            multiLine={true}
            rows={4}
            value={info}
            errorText={errors.info ? instructions.info : undefined}
            onChange={this.handleFieldChange} />
        </div>

        <PublicMiscSubjects form={form} subjects={subjects} error={errors.subjects} />

        <PublicMiscTags form={form} tags={tags} error={errors.tags} />

        <div {...subItems}>
          <h5>Essa atividade será pontuada?</h5>
          <Checkbox
            checked={!_.isNull(scores)}
            label='Sim'
            onCheck={this.handleHasScoreChange} />
        </div>

        <div className='ui basic segment'>
          <div {...next}>
            <FlatButton
              label='Próximo'
              disabled={!_.every(_.keys(errors), e => !_.includes(['subjects', 'name', 'info'], e))}
              primary={true}
              onTouchTap={this.handleNext} />
          </div>
        </div>

      </Paper>;
  },
});

import React from 'react';
import { Dialog, FlatButton, TextField } from 'material-ui';

TeacherTestCreateFormQuestionsShowScore = React.createClass({

  // Static Data

  instructions: {
    scores: 'Defina um valor numérico',
  },

  // Initial State

  getInitialState() {
    return { index: null };
  },

  // Lifecycle

  componentWillReceiveProps({ form: { doc: { questions } }, parent: { state: { question } } }) {
    this.setState({ index: _.indexOf(questions, question) });
  },

  // Handlers

  handleScoreChange({ target: { value } }) {
    // Get questions and scores from form
    const { props: { form, form: { doc: { questions, scores: ss } } },
      state: { index }, } = this;
    const scores = ss || [];

    // Update state and form
    scores[index] = Number(_.replace(value, ',', '.'));

    // Save on form
    form.defaultHandler({ scores }, { doc: true });
  },

  handleScoreSave() {
    const { props: { parent } } = this;
    parent.setState({ open: false, question: null });
    this.setState({ index: null });
  },

  handleScoreClose() {
    const { props: { form, form: { doc: { questions, scores } } },
      state: { index }, } = this;

    _.pullAt(scores, index);
    _.pullAt(questions, index);

    form.defaultHandler({ questions, scores }, { doc: true });

    this.handleScoreSave();
  },

  // Render

  render() {
    const { instructions, state: { index }, props: { open, form: {
      state: { errors },
      doc: { scores },
    }, }, } = this;

    return (
      <Dialog
        title='Valor da questão'
        modal={false}
        open={open}
        onRequestClose={this.handleScoreClose}
        actions={[
          <FlatButton
          label='Cancelar'
          secondary={true}
          onTouchTap={this.handleScoreClose} />,
          <FlatButton
            label='Ok'
            primary={true}
            disabled={!errors.scores && _.get(scores, index) ? false : true}
            onTouchTap={this.handleScoreSave} />,
        ]} >
        <TextField
          hintText='Valor da questão'
          floatingLabelText='Valor'
          errorText={errors.scores ? instructions.scores : undefined}
          onEnterKeyDown={this.handleScoreSave}
          onChange={this.handleScoreChange} />
      </Dialog>
    );
  },
});

import React from 'react';
import { Dialog, FlatButton, TextField, MenuItem, Card, CardMedia, CardTitle } from 'material-ui';

AdminQuestionEditQuestionsForm = React.createClass({
  mixins: [AstroForm(Questions.Schema, 'AdminQuestionSave')],

  // instructions

  instructions: {
    subjects: 'Selecione 1 matéria ',
    text: 'Redija um enunciado com 4 ou mais letras',
    type: 'Selecione o tipo de questão',
    answer: 'Redija uma resposta com 4 ou mais letras',
  },

  // properties

  properties: {
    dialog: {
      modal: false,
    },
  },

  // handlers

  handleClose() {
    this.props.parent.setState({ open: false, question: null });
  },

  handleSubjectChange(label, index, options) {
    const subjectId = _.get(options[index], 'value.key');
    this.defaultHandler({ subject: subjectId, tags: [] },
      { doc: true });
  },

  handleText({ target: { value } }) {
    this.defaultHandler({ text: value }, { doc: true });
  },

  handleSubmitSuccess({ _id }) {
    snack('Bom trabalho!');
    this.handleClose();
  },

  handleSubmitError(error) {
    snack('Algo deu errado!');
  },

  // render

  render() {
    const { properties, props: { open, parent, subjects, tags, images, ready },
      doc, instructions, state: { errors }, } = this;
    const image = _.find(images, { _id: doc.image });
    const actions = [
      <FlatButton
        label='Cancelar'
        secondary={true}
        onTouchTap={this.handleClose} />,
      <FlatButton
        label='Salvar'
        primary={true}
        onTouchTap={this.defaultSubmit} />,
    ];
    return (
      <Dialog
        modal={false}
        contentStyle={{
          width: '80%',
          maxWidth: 'none',
        }}
        bodyStyle={{ overflow: 'auto' }}
        open={open}
        title='Editar Questões'
        actions={actions}
        onRequestClose={this.handleClose}>
        <div className='ui grid' style={{ padding: '1em' }}>

          <div className='row'>
            <TextField
              floatingLabelText='Matéria'
              disabled={true}
              value={_.get(_.first(
                _.filter(subjects, s => s._id === doc.subject)), 'name')} />
          </div>

          <div className='row'>
            <PublicMiscTags form={this} error={errors.tags}
              tags={_.filter(tags, ({ subject }) => _.isEqual(subject, _.get(doc, 'subject')))} />
          </div>

          <div className='row'>
            <TextField
              floatingLabelText='Enunciado'
              hintText='Enunciado'
              multiLine={true}
              value={doc.text}
              rows={4}
              fullWidth={true}
              name={instructions.text}
              onChange={this.handleText} />
          </div>


          {!image ? undefined :
            <Card className='row'>
              <CardMedia overlay={<CardTitle title={_.get(image, 'original.name')} />} >
                <img src={image.url()} />
              </CardMedia>
            </Card>}


          <div className='row'>
            {doc.type ? (doc.type === 'open' ? (
              <TextField
                value={doc.answer}
                floatingLabelText='Resposta'
                hintText='Resposta'
                multiLine={true}
                rows={4}
                fullWidth={true}
                name={instructions.answer}
                onInput={this.handleAnswer}
              />
            ) : (ready.images === false ? <CircularProgress /> :
                <AdminQuestionEditQuestionsFormOptions form={this} images={images}/>
            )) : undefined}
          </div>

        </div>
      </Dialog>
    );
  },

});

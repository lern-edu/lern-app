// Libs
import React from 'react';
import { FlatButton, Dialog, Divider } from 'material-ui';
import { TextField, RaisedButton, SelectField, MenuItem } from 'material-ui';

// Views
import PublicContentCreateQuestionCreateAnswer from './Answer.jsx';
import PublicContentCreateQuestionCreateSubject from './Subject.jsx';
import PublicContentCreateQuestionCreateTags from './TagsContainer.jsx';

const PublicContentCreateQuestionCreate = React.createClass({
  mixins: [AstroForm(Questions.Schema, 'PublicQuestionSave')],

  // Static

  column: {
    className:
      'eight wide computer eight wide tablet sixteen wide mobile column',
  },

  // Handlers

  handleSubmitSuccess({ _id }) {
    console.log(`Question created: ${_id}`);
    this.props.form.defaultHandler({ question: _id }, { doc: true });
    this.props.form.handleSubmit();
    this.doc = new Questions.Schema();
    this.props.handleClose();
    snack('Bloco criado!');
  },

  // render

  render() {
    const { form, subjects, open, handleClose, images } = this.props;
    const { errors, valid } = this.state;

    return (
      <Dialog
        title='Criar questão'
        actions={[
          <FlatButton
            label='Cancelar'
            secondary={true}
            onTouchTap={handleClose} />,
          <FlatButton
            label='Criar'
            disabled={!valid}
            primary={true}
            onTouchTap={this.defaultSubmit} />,
        ]}
        modal={true}
        contentStyle={{ width: '100%', maxWidth: 'none' }}
        bodyStyle={{ color: 'black' }}
        open={open}
        onRequestClose={handleClose}
        autoScrollBodyContent={true} >

        <div className='ui grid' >

          <div className='row'>
            <h4>Tema</h4>
          </div>

          <div {...this.column} >
            <PublicContentCreateQuestionCreateSubject
              form={this}
              errors={errors}
              subjects={subjects} />
          </div>

          <div {...this.column} >
            <PublicContentCreateQuestionCreateTags
              form={this}
              errors={errors}
              subjects={subjects} />
          </div>

          <div className='sixteen wide column'>
            <Divider />
          </div>

        </div>

        <div className='ui grid' >

          <div className='row'>
            <h4>Enunciado</h4>
          </div>

          <div className='sixteen wide column' >
            <PublicContentCreate
              field='content'
              schema={Questions.ContentSchema}
              contentTypes={ContentTypes}
              form={this} />
          </div>

          <div className='row'>
            {_.map(this.doc.get('content'), (s, i) =>
              <PublicContentShow
                key={i}
                index={i}
                field='content'
                schema={Questions.ContentSchema}
                form={this}
                doc={s} />)}
            </div>

            <div className='sixteen wide column'>
              <Divider />
            </div>

        </div>

        <div className='ui grid' >

          <div className='row'>
            <h4>Resposta</h4>
          </div>

          <div className='row'>
            <PublicContentCreateQuestionCreateAnswer
              form={this}
            />
          </div>

        </div>

      </Dialog>
    );
  },
});

export default PublicContentCreateQuestionCreate;

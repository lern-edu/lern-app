// Libs
import React from 'react';
import { FlatButton, Dialog } from 'material-ui';
import { AutoComplete, TextField, RaisedButton } from 'material-ui';
import { SelectField, MenuItem, Toggle, Divider } from 'material-ui';

// Views
import AdminTestCreateFormPageQuestionCreateTags from './TagsContainer.jsx';
import AdminTestCreateFormPageQuestionCreateSubjects from './Subjects.jsx';

const AdminTestCreateFormPageQuestionCreate = React.createClass({
  mixins: [AstroForm(Questions.Schema, 'AdminQuestionSave')],

  // Static

  column: {
    className:
      'eight wide computer eight wide tablet sixteen wide mobile column',
  },

  // Lifecycle

  // Handlers

  handleSubjectChange({ text: subjectText, value: subjectId }, index) {
    if (subjectId) this.setState({ subjectId, subjectText,
      tagsIds: null, tagText: '', });;
  },

  handleTextChange({ currentTarget }, value) {
    const name = currentTarget.getAttribute('name');
    this.setState({ [name]: value });
  },

  // render

  render() {
    const { form, subjects, open, handleClose } = this.props;
    const { errors, valid } = this.state;

    console.log(this.doc);

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
            onTouchTap={handleClose} />,
        ]}
        modal={true}
        contentStyle={{ width: '100%', maxWidth: 'none' }}
        open={open}
        onRequestClose={handleClose}
        autoScrollBodyContent={true} >

        <div className='ui center aligned grid' >

          <div {...this.column} >
            <AdminTestCreateFormPageQuestionCreateSubjects
              form={this}
              errors={errors}
              subjects={subjects} />
          </div>

          <div {...this.column} >
            <AdminTestCreateFormPageQuestionCreateTags
              form={this}
              errors={errors}
              subjects={subjects} />
          </div>

        </div>

      </Dialog>
    );
  },
});

export default AdminTestCreateFormPageQuestionCreate;

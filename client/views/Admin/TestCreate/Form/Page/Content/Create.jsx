import React from 'react';
import { CardTitle, FlatButton } from 'material-ui';
import { DropDownMenu, MenuItem, TextField } from 'material-ui';

import AdminTestCreateFormPageQuestion from './Question/Question.jsx';

const AdminTestCreateFormPageCreateContentCreate = React.createClass({
  mixins: [AstroForm(Tests.PageContentSchema)],

  // Handlers

  handleSubmit() {
    const { type } = this.doc;
    this.props.form.defaultHandler({ content: _.clone(this.doc) },
      { doc: true, operation: 'push' });
    snack('Bloco criado!');
    this.doc = new Tests.PageContentSchema({ type });
    this.updateValidation();
  },

  handleTextChange({ currentTarget }, value) {
    const name = currentTarget.getAttribute('name');
    this.defaultHandler({ [name]: value }, { doc: true });
  },

  handleTypeChange(event, index, type) {
    this.defaultHandler({ type, [type]: '', [this.doc.get('type')]: null },
      { doc: true });
  },

  // Render

  render() {
    const { type, text, link, title } = this.doc;
    const { errors, valid } = this.state;

    return (
      <div className='ui basic segment' style={{ width: '100%' }}>
        <CardTitle title='Novo conteúdo' />

          <div className='row'>
            <DropDownMenu value={type} onChange={this.handleTypeChange} >
              {_.map(ContentTypes.all('both'), (v, k) =>
                <MenuItem key={k} value={k} primaryText={v} />)}
            </DropDownMenu>
          </div>

          <div className='row'>
            {_.get({
              text: <TextField
                  name='text'
                  value={text}
                  floatingLabelText='Texto'
                  onChange={this.handleTextChange}
                  errorText={_.get(errors, 'text')}
                  multiLine={true}
                  rows={4} />,
              title: <TextField
                  name='title'
                  value={title}
                  floatingLabelText='Título'
                  onChange={this.handleTextChange}
                  errorText={_.get(errors, 'title')} />,
              link: <TextField
                  name='link'
                  value={link}
                  floatingLabelText='Link'
                  onChange={this.handleTextChange}
                  errorText={_.get(errors, 'link')} />,
              question: <AdminTestCreateFormPageQuestion
                  form={this}
                  scored={this.props.scored}
                  questionsSelected={this.props.questionsSelected}
                  subjects={this.props.subjects} />,
            }, type)}
          </div>

          <div className='row'>
            <FlatButton
              onTouchTap={this.handleSubmit}
              disabled={!valid}
              secondary={true}
              label='Adicionar conteúdo' />
          </div>

      </div>
    );
  },

});

export default AdminTestCreateFormPageCreateContentCreate;

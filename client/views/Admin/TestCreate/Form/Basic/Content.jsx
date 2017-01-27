import React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui';
import { FlatButton, DropDownMenu, MenuItem, TextField } from 'material-ui';

const AdminTestCreateFormBasicContent = React.createClass({
  mixins: [AstroForm(Tests.ContentSchema)],

  // Handlers

  handleSubmit() {
    const { type } = this.doc;
    this.props.form.defaultHandler({ info: _.clone(this.doc) },
      { doc: true, operation: 'push' });
    snack('Bloco criado!');
    this.doc = new Tests.ContentSchema();
    this.updateValidation();
  },

  handleTextChange({ currentTarget }, value) {
    const name = currentTarget.getAttribute('name');
    this.defaultHandler({ [name]: value }, { doc: true });
  },

  handleTypeChange(event, index, type) {
    this.defaultHandler({ type }, { doc: true });
  },

  // Render

  render() {
    const { type, text, link, title } = this.doc;
    const { errors, valid } = this.state;

    return (
      <Card>
        <CardHeader title='Novo conteúdo' />

        <CardText>
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
            }, type)}
          </div>
        </CardText>

        <CardActions>
          <FlatButton
            onTouchTap={this.handleSubmit}
            disabled={!valid}
            secondary={true}
            label='Adicionar' />
        </CardActions>

      </Card>
    );
  },

});

export default AdminTestCreateFormBasicContent;

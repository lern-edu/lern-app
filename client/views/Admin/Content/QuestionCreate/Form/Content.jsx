import React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui';
import { FlatButton, DropDownMenu, MenuItem, TextField } from 'material-ui';

const AdminQuestionCreateFormContent = React.createClass({
  mixins: [AstroForm(Questions.ContentSchema)],

  // Lifecycle

  componentWillMount() {
    this.defaultHandler({ [this.doc.get('type')]: '' }, { doc: true });
  },

  // Handlers

  handleSubmit() {
    const { type } = this.doc;
    this.props.form.defaultHandler({ statement: _.clone(this.doc) },
      { doc: true, operation: 'push' });
    snack('Bloco criado!');
    this.doc = new Questions.ContentSchema();
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
    const { type, text, link } = this.doc;
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
                  hintText='Texto'
                  floatingLabelText='Texto'
                  onChange={this.handleTextChange}
                  errorText={_.get(errors, 'text')}
                  multiLine={true}
                  rows={4} />,
              link: <TextField
                  name='link'
                  value={link}
                  hintText='Link'
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

export default AdminQuestionCreateFormContent;

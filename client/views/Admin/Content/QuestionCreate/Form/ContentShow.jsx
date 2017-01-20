import React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui';
import { FlatButton, DropDownMenu, MenuItem, TextField } from 'material-ui';

const AdminQuestionCreateFormContentShow = React.createClass({

  // Handlers

  handleRemove() {
    const { index, form, form: { doc: { statement } } } = this.props;
    _.pullAt(statement, index);
    form.defaultHandler({ statement }, { doc: true });
  },

  // Render

  render() {
    const { index, statement: { type, text, link } } = this.props;

    return (
      <Card>
        <CardHeader title={`Conteúdo ${index + 1}`} subtitle={type} />

        <CardText>
          <div className='row'>
            {_.get({
              text: <p>{text}</p>,
              link: <a>{link}</a>,
            }, type)}
          </div>
        </CardText>

        <CardActions>
          <FlatButton
            onTouchTap={this.handleRemove}
            primary={true}
            label='Remover' />
        </CardActions>

      </Card>
    );
  },

});

export default AdminQuestionCreateFormContentShow;

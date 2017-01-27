import React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui';
import { FlatButton, CardTitle } from 'material-ui';

const AdminTestCreateFormBasicContentShow = React.createClass({

  // Handlers

  handleRemove() {
    const { index, form, form: { doc: { info } } } = this.props;
    _.pullAt(info, index);
    form.defaultHandler({ info }, { doc: true });
  },

  // Render

  render() {
    const { index, info: { type, text, link, title } } = this.props;

    return (
      <Card>
        <CardHeader title={`Conteúdo ${index + 1}`} subtitle={type} />

        <CardText>
          {_.get({
            text: <p>{text}</p>,
            link: <a>{link}</a>,
            title: <CardTitle title={title} />,
          }, type)}
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

export default AdminTestCreateFormBasicContentShow;

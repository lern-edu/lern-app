// Libs
import React from 'react';
import { FlatButton, Card, CardHeader, TextField } from 'material-ui';
import { CardText, CardActions, Divider, CardTitle } from 'material-ui';

const AdminTestCreateFormPageShow = React.createClass({
  mixins: [AstroForm(Tests.PageSchema)],

  // Handlers

  handleRemove() {
    const { index, form, form: { doc: { pages } } } = this.props;
    _.pullAt(pages, index);
    form.defaultHandler({ pages }, { doc: true });
  },

  handleTimeoutChange({ currentTarget }, value) {
    const field = currentTarget.getAttribute('name');
    const timeout = parseInt(value);
    if (timeout || value == '')
      this.defaultHandler({ [field]: timeout }, { doc: true });
    else return;
  },

  /* Render
  */

  render() {
    const { form, index, doc: { content, timeout } } = this.props;
    const { errors={} } = this.state;

    return (
      <Card>
        <CardHeader title={`Página ${index + 1}`} />

        <CardText>
          <TextField
            value={timeout || ''}
            disabled={form.doc.get('timeoutType') != 'page'}
            floatingLabelText='Cronômetro'
            errorText={errors.timeout}
            name='timeout'
            onChange={this.handleTimeoutChange} />
        </CardText>

        {_.map(content, (c, i) => <div key={i} >
            {_.get({
              text: <CardText><p>{c.text}</p></CardText>,
              link: <CardText><a>{c.link}</a></CardText>,
              title: <CardTitle title={c.title} />,
            }, c.type)}
          </div>
        )}

        <CardActions>
          <FlatButton
            onTouchTap={this.handleRemove}
            secondary={true}
            label='Remover página' />
        </CardActions>

      </Card>
    );
  },
});

export default AdminTestCreateFormPageShow;

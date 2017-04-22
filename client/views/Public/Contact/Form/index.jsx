// Libs
import React from 'react';
import { Card, FlatButton, CardText } from 'material-ui';
import { Divider, CardActions } from 'material-ui';

// Views
import PublicContactFormRadio from './Radio.jsx';
import PublicContactFormText from './Text.jsx';

const PublicContactForm = React.createClass({

  /* Lifecycle
  */

  getInitialState() {
    return { text: undefined };
  },

  /* Handlers
  */

  handleTextChange(event) {
    const text = $(event.target).val();
    this.setState({ text });
  },

  handleSubmit() {
    Meteor.call('UserContact', { type: this.props.type, text: this.state.text }, (err, res) => {
      if (err) {
        console.log(err);
        snack('Problemas no envio da mensagem');
      } else {
        snack('Mensagem enviada');
        FlowRouter.go(Meteor.user().getHomeRoute());
      }
    });
  },

  /* Render
  */

  render() {
    const { type='question' } = this.props;
    const { text } = this.state;

    return (
      <Card style={{ marginTop: 10 }}>
        <CardText>

          <div className='row' >
            <PublicContactFormRadio value={type} />
          </div>

          <Divider style={{ marginTop: 10 }} />

          <div className='row' style={{ marginTop: 15 }} >
            <PublicContactFormText value={text} form={this}/>
          </div>

        </CardText>

        <CardActions>
          <FlatButton
            primary={true}
            label='Enviar'
            onClick={this.handleSubmit}
            disabled={!(type && text && text.length > 16)}
          />
        </CardActions>

      </Card>
    );
  },
});

export default PublicContactForm;

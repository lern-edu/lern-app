import React from 'react';
import { Paper, RaisedButton, FontIcon } from 'material-ui';

PublicContactForm = React.createClass({

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
        snack(':(');
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
      <Paper className='ui basic segment'>
        <div className='ui vertical basic segment'>
          <PublicContactFormRadio value={type} />
        </div>
        <div className='ui vertical basic segment'>
          <PublicContactFormText value={text} form={this}/>
        </div>
        <div className='ui center aligned  vertical basic segment'>
          <RaisedButton
            primary={true}
            label='Enviar'
            icon={<FontIcon className='material-icons'>send</FontIcon>}
            onClick={this.handleSubmit}
            disabled={!(type && text && text.length > 16)}
          />
        </div>
      </Paper>
    );
  },
});

// Libs
import React from 'react';
import { FontIcon } from 'material-ui';
import { Paper } from 'material-ui';
import { RaisedButton } from 'material-ui';

// Views
import PublicHomeAction from './Action.jsx';
import PublicHomeTopTitle from './TopTitle.jsx';
import PublicHomeSubscribe from './Subscribe.jsx';
import PublicHomeChart from './Chart.jsx';
import PublicHomeSoluction from './Soluction.jsx';
import PublicHomeFooter from './Footer.jsx';
import PublicHomeDevices from './Devices.jsx';

export default class PublicHomeView extends React.Component {

  // Initial State

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      valid: false,
      text: '',
    };
  }

  // Handlers

  handleSubmit() {
    const { email, text, valid } = this.state;

    if (!Match.Regex(email).mail()) {
      snack('Digite um email válido');
      return;
    };

    Meteor.call('PublicSendEmail', { email, text }, (err) => {
      if (err) console.log(err);
      else {
        snack('Obrigado!');
        this.setState({ email: '' });
      };
    });
  }

  // Render

  render() {
    return (
      <div>

        {/* <PublicHomeAction /> */}

        <PublicHomeTopTitle />

        <PublicHomeSubscribe parent={this} text={
          <p>Se inscreva para mais informações sobre o curso de
            <br/>Competências Empreendedoras
          </p>
          }
        />

        <PublicHomeChart />

        <PublicHomeSoluction />

        <PublicHomeDevices />

        <PublicHomeSubscribe
          parent={this}
          text='Deixe seu e-mail para entrarmos em contato' />

        <PublicHomeFooter />

      </div>
    );
  }

};

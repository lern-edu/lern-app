// Libs
import React from 'react';
import { FontIcon } from 'material-ui';
import { Paper } from 'material-ui';
import { TextField, RaisedButton, Avatar } from 'material-ui';

// Views
import PublicHomeTopTitle from './TopTitle.jsx';
import PublicHomeSubscribe from './Subscribe.jsx';
import PublicHomeChart from './Chart.jsx';
import PublicHomeSoluction from './Soluction.jsx';
import PublicHomeFooter from './Footer.jsx';

PublicHomeView = React.createClass({

  // Text

  text: {
    block3: {
      one: {
        img: '/images/home/cf-1.svg',
        text: 'Reunir email dos alunos',
      },
      two: {
        img: '/images/home/cf-2.svg',
        text: 'Enviar relação de email dos alunos, horário das aulas e matéria' +
          ' lecionada para suporte@lern.com.br',
      },
      tree: {
        img: '/images/home/cf-3.svg',
        text: 'Receber acesso total ao sistema e utilizá-lo',
      },
      four: {
        img: '/images/home/cf-4.svg',
        text: 'Reconhecer na lern a seu companheira de sala de aula',
      },
    },
    contact: {
      title: 'Contato',
      text: 'Se inscreva e receba mais informações! Ou nos envie as informações para' +
        ' criar sua própria turma na plataforma.',
    },
  },

  // Styles

  styles: {
    imac: {
      backgroundImage: 'url(/images/home/imac.svg)',
      backgroundRepeat: 'no-repeat',
    },
    phone: {
      backgroundImage: 'url(/images/home/phone.svg)',
      backgroundRepeat: 'no-repeat',
      marginTop: '24%',
    },
    myFont: {
      top: '5px',
      padding: '12px 16px',
      fontSize: '16px',
      lineHeight: '1.5',
      display: 'block',
    },
  },

  // Initial State

  getInitialState() {
    return {
      email: '',
      text: 'Quero conhecer o curso',
      emailDialog: false,
    };
  },

  // Handlers

  handleEmail() {
    const { emailDialog } = this.state;
    this.setState({ emailDialog: !emailDialog });
  },

  handleSubmit() {
    const { email, text, valid } = this.state;
    if (!this.emailValidator()) {
      snack('Digite um email válido');
      return;
    };

    Meteor.call('PublicSendEmail', { email, text }, (err) => {
      if (err) console.log(err);
      else {
        snack('Obrigado!');
        this.setState({ email: '', text: '' });
        this.props.handleEmail();
      };
    });
  },

  // Render

  render() {
    const {

      styles: {
        imac,
        myFont,
        phone,
      },
      text: {
        block3,
        contact,
      },
      state: {
        emailDialog,
      },
    } = this;

    return (
      <div>

        <PublicHomeAction />

        <PublicHomeTopTitle />

        <PublicHomeSubscribe parent={this} text={
          <p>Se inscreva para mais informações sobre o curso de
            <br/>Competências Empreendedoras
          </p>
          }
        />

        <PublicHomeChart />

        <PublicHomeSoluction />

        <PublicHomeSubscribe
          parent={this}
          text='Se increva aqui para conversar com a nossa equipe' />

        <div style={{ backgroundColor: '#0066cc', minHeight: '375px', color: 'white' }}
          className='sixteen wide column'>
          <div className='ui grid fluid container' >
            <div className='right aligned sixteen wide column' style={{ textAlign: 'center' }}>
              <h1>Disponível em diversas plataformas</h1>
            </div>
            <div className='six wide computer eight wide mobile column'>
              <div ref='imac' style={imac}>
                <img src='/images/home/icone-logo.svg' style={{ margin: '11% 27% 31%' }}/>
              </div>
            </div>
            <div className='four wide computer eight wide mobile column'>
              <div ref='phone' style={phone}>
                <img src='/images/home/icone-logo.svg' style={{
                  marginTop: '37%',
                  marginLeft: '8%',
                  marginRight: '60%',
                  marginBottom: '32%',
                }}/>
              </div>
            </div>
            <div className='six wide computer sixteen wide mobile column'
              style={{ fontSize: '18px' }}>
              <br />
              <br />
              A lern, como boa ferramenta que é pode ser usada ao gosto do
              usuário, em dispositivos móveis, ou desktops, através do seu
              navegador preferido (Google Chrome, Mozilla Firefox, Safari).
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: '#FFF' }} className='sixteen wide column'>
          <div className='ui centered two column very padded grid'>
            <div className='center aligned column'>
              <div style={{ paddingBottom: '30px' }} >
                <h1>{_.get(contact, 'title')}</h1>
              </div>
              <div style={{ paddingBottom: '30px' }} >
                <p style={myFont}>{_.get(contact, 'text')}</p>
              </div>
              <div>
                <RaisedButton
                  label='Enviar mensagem'
                  secondary={true}
                  onTouchTap={this.handleEmail}
                  icon={<FontIcon className='material-icons'>send</FontIcon>} />
                <PublicHomeEmail handleEmail={this.handleEmail} open={emailDialog}/>
              </div>
            </div>
          </div>
        </div>

        <PublicHomeFooter />

      </div>
    );
  },
});

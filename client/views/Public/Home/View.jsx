import React from 'react';
import { Paper, Avatar, RaisedButton, FontIcon } from 'material-ui';

PublicHomeView = React.createClass({

  // Static data
  // Text

  text: {
    block2: {
      prof: {
        title: 'Professores @ Lern',
        text: 'Emponderamento, otimização do tempo e organização, gerando aulas ' +
        'mais dinâmicas e interativas, através de exercícos online e impressos,' +
        ' alem de diário online',
      },
      classroom: {
        title: 'Sala de Aula @ Lern',
        text: 'Maior interação em sala de aula e planejamento de aula com ajuda de estatísticas, '
        + 'fazendo com que as aulas sejam mais produtivas e de acordo com as reais necessidades dos'
        + ' alunos',
      },
      study: {
        title: 'Estudo @ Lern',
        text: 'Melhora no desempenho do estudante através de um acompanhamento mais próximo e '
          + 'preciso, através de uma plataforma completa de estudos acompanhada pelo professor',
      },
      school: {
        title: 'Escola @ Lern',
        text: 'Otimização dos processos avaliativos através de um poderoso sistema de' +
        ' gestão acadêmica, maior aproveitamento do tempo em sala de aula e melhor' +
        ' acompanhamento dos alunos',
      },
    },
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
    footerText: 'Copyright © 2016 | Lern - Soluções Educacionais',
    contact: {
      title: 'Contato',
      text: 'Se inscreva e receba mais informações! Ou nos envie as informações para' +
        ' criar sua própria turma na plataforma.',
    },
  },

  // Styles

  styles: {
    title1: {
      textAlign: 'center',
      marginBottom: '30px',
      top: '20px',
      position: 'relative',
    },
    footer: {
      backgroundColor: 'dimgrey',
      padding: '38px',
      bottom: '-50px',
      color: '#e2e2e2',
      position: 'relative',
      width: '100%',
      textAlign: 'center',
    },
    bgParallax: {
      margin: '0 auto',
      width: '100%',
      minHeight: '100%',
      textShadow: '2px 3px 10px rgba(0, 0, 0, 0.7)',
      backgroundColor: '#0066cc',
      height: '100vh',
      color: 'white',
      lineHeight: '1.5',
      fontSize: '30px',
      backgroundSize: 'cover',
    },
    mask: {
      height: '100%',
      position: 'absolute',
      width: '100%',
      background: '#4d97ff',
      margin: '0',
      padding: '0',
      opacity: '0.8',
    },
    shadow: {
      height: '10px',
      width: '100%',
      boxShadow: '0px -8px 10px 0px rgba(0, 0, 0, 0.2)',
      position: 'absolute',
    },
    arrowScroll: {
      margin: 'auto 0',
      display: 'block',
      position: 'absolute',
      bottom: '40px',
      transition: '0.5s',
      width: '7%',
      left: '46.5%',
      cursor: 'pointer',
    },
    imac: {
      backgroundImage: 'url(/images/home/imac.svg)',
      backgroundRepeat: 'no-repeat',
      visibility: 'hidden',
    },
    phone: {
      backgroundImage: 'url(/images/home/phone.svg)',
      backgroundRepeat: 'no-repeat',
      marginTop: '24%',
      visibility: 'hidden',
    },
    soluction: {
      backgroundColor: '#fff',
      backgroundImage: 'linear-gradient(#eee .1em, transparent .1em)',
      backgroundSize: '100% 1.2em',
    },
    shadow: {
      height: '10px',
      width: '100%',
      boxShadow: '0px -8px 10px 0px rgba(0, 0, 0, 0.2)',
      position: 'absolute',
    },
    verticalAlign: {
      display: 'flex',
      alignItems: 'center',
    },
    myFont: {
      top: '5px',
      padding: '12px 16px',
      fontSize: '16px',
      lineHeight: '1.5',
      display: 'block',
    },
  },

  // Context

  contextTypes: {
    showSnack: React.PropTypes.func,
    user: React.PropTypes.object,
  },

  // Initial State

  getInitialState() {
    const { innerWidth } = window;
    return { nameLogo: {
        margin: innerWidth < 768 ? 'auto' : 'none',
        top: innerWidth < 768 ? '24vh' : '28vh',
      },
      logoImg: { top: innerWidth < 768 ? '15vh' : '25vh' },
      emailDialog: false,
    };
  },

  // Lifecycle

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);

    $(this.refs.slogan).css('visibility', 'hidden').transition({
      animation: 'fly left',
      duration: '3s', });
  },

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
  },

  // Handlers

  handleResize({ target: { window: { innerWidth } } }) {
    this.setState({ nameLogo: {
        margin: innerWidth < 768 ? 'auto' : 'none',
        top: innerWidth < 768 ? '24vh' : '28vh',
      },
      logoImg: { top: innerWidth < 768 ? '15vh' : '25vh' },
    });
  },

  handleScroll(event) {
    if (event.target.scrollingElement.scrollTop > 1200)
      $(this.refs.imac).transition({
        animation: 'fly right',
        duration: '3s',
      }).delay(3000).transition('clear queue');

    $(this.refs.phone).transition({
      animation: 'fly left',
      duration: '3s',
    }).delay(3000).transition('clear queue');

  },

  handleScrollDown(event) {
    this.refs.soluction.scrollIntoView({ block: 'end', behavior: 'auto' });
    $(this.refs.soluction).transition('bounce');
  },

  handleEmail() {
    const { emailDialog } = this.state;
    this.setState({ emailDialog: !emailDialog });
  },

  // Render

  render() {
    const { context: { user }, styles: { footer, bgParallax, mask, arrowScroll,
      title1, imac, phone, soluction, shadow, verticalAlign, myFont, },
    text: { block2, block3, footerText, contact },
    state: { nameLogo, logoImg, emailDialog }, } = this;
    return (
      <div>

        <PublicHomeAction {...this.context}/>

        <div data-speed='2' style={bgParallax}>
          <div style={mask}></div>
          <div className='ui stackable grid fluid container'>
            <div className='tablet only computer only seven wide column' style={logoImg}>
              <img style={{ width: '60%' }} src='/images/icons/web_hi_res_512.png' />
            </div>
            <div
              className='sixteen wide mobile nine wide tablet nine wide computer column'
              style={_.assign(nameLogo, { paddingLeft: '6%' })} >
              <img style={{ width: '80%' }} src='/images/home/nome-logo.svg' />
              <br />
              <div ref='slogan' style={{ top: '25%' }}>
                Para professores</div>
             </div>
          </div>
        </div>
        <div onClick={this.handleScrollDown}>
          <svg version='1.1'
            style={arrowScroll}
            baseProfile='tiny' x='0px' y='0px'
            viewBox='0 0 24.3 13.9'>
            <polygon points='24,2 22,0 12.1,9.9 2.2,0 0.2,2 12.1,13.9 12.1,13.9 12.1,13.9 ' />
          </svg>
        </div>
        <div style={shadow} />
        <div ref='soluction' style={soluction}>
          <h1 style={title1} >Soluções @ Lern</h1>
          <br />
          <div className='ui grid fluid' style={{
            margin: '0rem !important',
            width: '100% !important',
          }}>
            {_.map(block2, ({ title, text }, key) =>
              <div key={key} className='eight wide mobile four wide computer column'>
                <h2 style={{ padding: '12px 16px' }}>{title}</h2>
                <p style={myFont}>{text}</p>
              </div>
            )}
          </div>
            <Paper style={{ backgroundColor: '#FFF176', backgroundSize: '100%' }}
              className='sixteen wide column' zDepth={2}>
              <h1 style={title1} >Teste agora</h1>
                <div className='ui grid'>
                  {_.map(block3, ({ img, text }, key) =>
                    <div key={key}
                    className={'sixteen wide mobile eight' +
                    'wide tablet four wide computer center aligned column'}
                      style={{ padding: '30px !important' }}>
                      <Paper zDepth={5} circle={true}
                        style={{ height: '160px',
                          width: '160px',
                          display: 'inline-block', }}>
                        <Avatar src={img} size={162}
                          style={{ backgroundColor: 'white' }} />
                      </Paper>
                      <p style={myFont}>{text}</p>
                    </div>
                  )}
              </div>
            </Paper>
            <div style={{ backgroundColor: '#0066cc', minHeight: '375px', color: 'white' }}
              className='sixteen wide column'>
              <div className='ui grid fluid container' >
                <div className='right aligned sixteen wide column' style={{ textAlign: 'center' }}>
                  <h1>Multiplataforma</h1>
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
          </div>
          <div className='footer' style={footer}>{footerText}</div>
      </div>
    );
  },
});

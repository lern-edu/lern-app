import React from 'react';
import { RaisedButton } from 'material-ui';

const CommonContent = React.createClass({

  render() {
    const { className } = this.props;
    return (
      <div className={className} >
        <div className='computer only seven wide column' style={{ top: '12vh' }}>
          <img style={{ width: '60%' }} src='/images/icons/web_hi_res_512.png' />
        </div>
        <div
          className='computer only seven wide column'
          style={{ top: '12vh' }} >
          <div
            className='ui text'
            style={{
              lineHeight: '1.5',
              textShadow: '0 0 10px rgba(0,0,0,.85)',
              marginTop: '8vh',
            }}
          >
            <h1 className='ui inverted header' style={{ fontSize: 58 }}>
              Um novo mundo
              <br/>
              de competências
            </h1>
          </div>
          <RaisedButton secondary={true} label='Conheça o curso de habilidades empreendedoras' />
        </div>

        <div className='mobile only sixteen wide column' >
          <img
            style={{ width: '41%', marginTop: '64px' }}
            src='/images/icons/web_hi_res_512.png' />
        </div>

        <div className='tablet only sixteen wide column' >
          <img
            style={{ width: '24%', marginTop: '64px' }}
            src='/images/icons/web_hi_res_512.png' />
        </div>

        <div
          className='mobile only tablet only sixteen wide column' >
          <div
            className='ui text container'
            style={{ lineHeight: '1.5', textShadow: '0 0 10px rgba(0,0,0,.85)' }}
          >
            <h1 className='ui inverted header' style={{ fontSize: 40 }}>
              Um novo mundo
              <br/>
              de competências
            </h1>
          </div>
          <RaisedButton secondary={true} label='Conheça nosso curso' />
        </div>
      </div>
    );
  },
});

const PublicHomeTopTitle = React.createClass({

  // Styles

  styles: {
    bgParallax: {
      margin: '0 auto',
      width: '100%',
      minHeight: '100%',
      textShadow: '2px 3px 10px rgba(0, 0, 0, 0.7)',
      width: 'auto',
      backgroundColor: '#f3f3f3',
      background: 'url(\'/images/home/top.jpg\') center 30% no-repeat',
      backgroundSize: 'cover',
      height: '80vh',
      color: 'white',
    },
  },

  render() {
    const { bgParallax } = this.styles;
    return (
      <div data-speed='2' style={bgParallax}>

        <CommonContent
          className='mobile only tablet only ui stackable grid center aligned fluid' />

        <CommonContent
          className='computer only ui stackable grid fluid' />

      </div>
    );
  },
});

export default PublicHomeTopTitle;

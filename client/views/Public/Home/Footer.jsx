import React from 'react';
import { CardText, Card, CardMedia, CardTitle } from 'material-ui';

const PublicHomeFooter = React.createClass({

  // Styles

  styles: {
    footer: {
      backgroundColor: 'dimgrey',
      padding: '38px',
      bottom: '-50px',
      color: '#e2e2e2',
      position: 'relative',
      width: '100%',
      textAlign: 'center',
    },
  },

  render() {
    return (
      <div className='footer' style={this.styles.footer}>
        Copyright © 2016 | Lern - Soluções Educacionais
      </div>
    );
  },
});

export default PublicHomeFooter;

import React from 'react';
import { CardText, Card, CardMedia, CardTitle } from 'material-ui';

const styles = {
  footer: {
    backgroundColor: 'dimgrey',
    padding: '38px',
    color: '#e2e2e2',
    position: 'relative',
    width: '100%',
    textAlign: 'center',
  },
};

export default class PublicHomeFooter extends React.Component {

  render() {
    return (
      <div className='footer' style={styles.footer}>
        Copyright © 2017 | Lern - Soluções Educacionais
      </div>
    );
  }
};

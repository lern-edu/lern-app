import React from 'react';
import { Card, CardMedia, CardTitle, Paper, Styles } from 'material-ui';
import { blue700 } from 'material-ui/styles/colors';

StudentHomeTutorial = React.createClass({

  //Lifecycle

  componentDidMount() {
    $(this.refs.stepper).slick({
      arrows: true,
      dots: false,
      infinite: false,
    });
  },

  // Render

  /*
    TODO Botão com para mudar tutorial
    basta essa usar essa função Meteor.call('UserUpdateProfileTutorial')
  */

  render() {
    const { welcome, tutorial, steps } = this.props;

    return (
      <div
        className='ui container fluid'
        style={{ backgroundColor: blue700, height: '90vh' }}>

        <div className='ui center aligned huge header'
          style={{ marginTop: '0px', paddingTop: '30px', color: 'white' }}>{welcome}</div>
      <div className='ui center aligned medium header'
        style={{ marginTop: '0px', paddingTop: '20px', color: 'white' }}>{tutorial}</div>
      <div className='ui two column computer one column mobile centered grid'>
           <div className='single-item column'>
           {_.map(steps, ({ img, text }, key) =>
             <div key={key}>
                <Card>
                  <CardMedia>
                    <img src={img} alt=''/>
                  </CardMedia>
                  <CardTitle title={text} />
                </Card>
             </div>
           )}
          </div>
        </div>
      </div>
    );
  },
});

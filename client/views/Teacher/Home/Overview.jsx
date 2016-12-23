import React from 'react';
import { Card, CardMedia, CardTitle, Paper, Styles } from 'material-ui';
const { blue700: lightBlue } = Styles;

TeacherHomeOverview = React.createClass({

  // Render

  render() {

    return (
      <div
        className='ui container fluid'
        style={{ backgroundColor: lightBlue, height: '90vh' }}>
        <div>
          <img src="/images/steps-students/seta.svg" style={{ width: '300px', padding: '10px'}}></img>
        </div>
        <div className='ui centered grid'>
          <div className='ten wide computer sixteen wide tablet column'>
            Oi
          </div>
        </div>
      </div>
    );
  },
});

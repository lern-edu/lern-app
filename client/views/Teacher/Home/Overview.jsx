import React from 'react';
import { Card, CardMedia, CardTitle, Paper, Styles } from 'material-ui';
import { blue700 } from 'material-ui/styles/colors';

TeacherHomeOverview = React.createClass({

  // Render

  render() {

    return (
      <div
        className='ui container fluid'
        style={{ backgroundColor: blue700, height: '90vh' }}>
        <div>
          <img src="/images/steps-students/seta.svg" style={{ width: '300px', padding: '10px' }}>
          </img>
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

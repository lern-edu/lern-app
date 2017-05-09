import React from 'react';
import { Card, CardMedia, CardTitle, CardActions, FlatButton, Paper, Styles } from 'material-ui';
import { blue700 } from 'material-ui/styles/colors';

StudentHomeOverview = React.createClass({
  // Render

  render() {
    const { ready, courses } = this.props;
    return (
      <div
       className='ui container fluid'
       style={{ backgroundColor: blue700, height: 'calc(100vh - 64px)', margin: '0 !important' }}>
          <div>
           <img src='/images/steps-students/seta.svg'
            style={{ width: '300px', padding: '10px' }} className='left floated cloumn'></img>
          </div>
          <div className='ui centered grid' style={{margin: '0 !important'}}>
             {_.map(courses, course =>
               <Card className='fourteen wide mobile six wide tablet four wide computer column'
                  key={course._id} style={{ margin: '20px' }}>
                 <CardTitle
                   title={course.name} />
                 <CardActions>
                   <FlatButton

                     primary={true}
                     href={FlowRouter.path('StudentCourseShow', { courseId: course._id })}
                     label='Entrar' />
                 </CardActions>
               </Card>
           )}
        </div>
      </div>
    );
  },
});

import React from 'react';
import { Card, CardTitle, CardActions, FlatButton } from 'material-ui';
import { blue700 } from 'material-ui/styles/colors';

const TeacherHomeOverview = React.createClass({

  // Render

  render() {
    const { ready, courses } = this.props;
    return (
      <div
        className='ui container fluid'
        style={{ backgroundColor: blue700, height: 'calc(100vh - 64px)' }}>
        <div>
          <img src="/images/steps-students/seta.svg" style={{ width: '300px', padding: '10px' }}>
          </img>
        </div>
        <div className='ui centered grid' style={{ margin: 0 }}>
           {
             _.map(courses, course =>
             <Card className='fourteen wide mobile six wide tablet four wide computer column'
                key={course._id} style={{ margin: '20px' }}>
               <CardTitle
                 title={course.name} />
               <CardActions>
                 <FlatButton
                   secondary={true}
                   href={FlowRouter.path('TeacherCourseShow', { courseId: course._id })}
                   label='Entrar' />
               </CardActions>
             </Card>
           )
         }
       </div>
     </div>
    );
  },
});

export default TeacherHomeOverview;

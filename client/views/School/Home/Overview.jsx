import React from 'react';
import { Card, CardTitle, CardActions, FlatButton } from 'material-ui';
import { blue700 } from 'material-ui/styles/colors';

const SchoolHomeOverview = React.createClass({

  render() {

    return (
      <div className='ui container fluid'>
        <div>
          <img src="/images/steps-students/seta.svg" style={{ width: '300px', padding: '10px' }}>
          </img>
        </div>
        <div className='ui centered grid'>
          <Card className='six wide computer sixteen wide mobile column'style={{ margin: '20px' }}>
            <CardTitle title="Gerenciar alunos"/>
            <CardActions>
              <FlatButton
                secondary={true}
                href={FlowRouter.path('SchoolUsers')}
                label='Entrar'
              />
            </CardActions>
          </Card>
          <Card className='six wide computer sixteen wide mobile column'style={{ margin: '20px' }}>
            <CardTitle title="Gerenciar cursos"/>
            <CardActions>
              <FlatButton
                secondary={true}
                href={FlowRouter.path('SchoolCourses')}
                label='Entrar'
              />
            </CardActions>
          </Card>
          <Card className='six wide computer sixteen wide mobile column'style={{ margin: '20px' }}>
            <CardTitle title="Gerenciar Testes"/>
            <CardActions>
              <FlatButton
                secondary={true}
                href={FlowRouter.path('SchoolTests')}
                label='Entrar'
              />
            </CardActions>
        </Card>
        </div>
      </div>
    );
  },
});
export default SchoolHomeOverview;

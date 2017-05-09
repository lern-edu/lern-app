// Libs
import React from 'react';
import { Avatar, List, ListItem, Divider } from 'material-ui';
import { RaisedButton, FlatButton, LinearProgress } from 'material-ui';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

const StudentCourseIngressFormCourseView = React.createClass({

  // Context

  contextTypes: {
    user: React.PropTypes.object,
  },

  // Handlers

  handleSubmit() {
    const { alias, course, form } = this.props;
    const { user } = this.context;
    Meteor.call(
      'StudentCourseIngress',
      { courseId: course._id, userId: user._id },
      (err, c) => {
        if (err) {
          console.error(err);
          snack('O curso não foi encontrado');
        } else {
          snack(`Ingressado no curso ${_.get(course, 'name')} !`);
          FlowRouter.go('StudentCourseShow', { courseId: course._id });
        };
      }
    );
  },

  /* Render
  */

  render() {
    const { form, alias, course, school, ready } = this.props;
    const profilePic = _.get(school, 'profile.profilePic');
    return (
      <div>
        {!_.every(ready) ? <LinearProgress /> : (!course ?
          <h1>Nenhum curso encontrado</h1> :
        <Card>
          <CardHeader
            title={`Escola: ${_.get(school, 'profile.name')}`}
            subtitle={`${i18n.__(`SchoolTypes.${_.get(school, 'profile.schoolType')}`)}`}
            avatar={profilePic ? <Avatar src={profilePic} /> :
              <Avatar size={32}>{_.head(_.get(school, 'profile.name'))}</Avatar>}
          />
          <CardTitle
            title={`Curso: ${_.get(course, 'name')}`}
            subtitle={<p><b>Início:</b> {moment(_.get(course, 'startDate')).format('DD/MM/YYYY')}
              <br/><b>Término:</b> {moment(_.get(course, 'endDate')).format('DD/MM/YYYY')}</p>} />
          <CardText>

            <div className='ui grid' >

              <div className='sixteen wide column'>
                <Divider />
              </div>

              <div className='sixteen wide column'>
                <h4>Horários</h4>
              </div>

              <div className='sixteen wide column'>
                <List style={{ width: '100%' }} >
                  {_.map(_.get(course, 'schedule'), (s, i) =>
                    <ListItem
                      key={`${s.day}${i}`}
                      disabled={true}
                      primaryText={i18n.__(`WeekDays.${s.day}`)}
                      secondaryText={<p><b>Início:</b> {moment(_.get(s, 'startDate')).format('LT')}
                        - <b>Término:</b> {moment(_.get(s, 'endDate')).format('LT')}</p>}
                     />
                    )}
                </List>
              </div>

              <div className='sixteen wide column'>
                <Divider />
              </div>

              <div className='sixteen wide column'>
                <h4>Informações</h4>
              </div>

              {_.map(course.get('info'), (s, i) =>
                <div className='sixteen wide column' key={i} >
                  <PublicContentShow
                    canRemove={false}
                    schema={Courses.ContentSchema}
                    index={i}
                    doc={s} />
              </div>)}

            </div>

          </CardText>
        </Card>
      )}

        <div className='row' style={{ marginTop: 10 }}>
          <RaisedButton
            label='Voltar'
            secondary={true}
            style={{ marginRight: 5 }}
            onTouchTap={() => FlowRouter.go('StudentHome')} />
          <RaisedButton
            label='Ingressar'
            disabled={!course}
            primary={true}
            onTouchTap={this.handleSubmit} />
        </div>

      </div>
    );
  },
});

export default StudentCourseIngressFormCourseView;

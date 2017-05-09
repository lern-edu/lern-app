import React from 'react';
import { Card, CardActions, CardHeader } from 'material-ui';
import { List, Subheader, ListItem, Avatar, CardText } from 'material-ui';
import { FlatButton, FontIcon } from 'material-ui';
import { blue500 } from 'material-ui/styles/colors';

const TeacherCourseShowTestsCard = React.createClass({

  /* Render
  */

  render() {
    const { test, subjects, course, tags } = this.props;

    const countScore = _.sum(
      _.flatten(
        _.map(test.get('pages'), ({ content }) =>
          _.map(content, c => _.get(c, 'score') || 0)
        )
      )
    );

    return (
      <div className='sixteen wide mobile eight wide tablet five wide computer column' >
        <Card>
          <CardHeader
            title={test.name}
            subtitle={
              `${moment(test.startDate).format('DD/MM')} -
               ${moment(test.endDate).format('DD/MM')}`
            }
          />
          <CardText>
            <List>
              <ListItem
                disabled={true}
                leftAvatar={
                  <Avatar backgroundColor={blue500}>
                    {test.questions.length}
                  </Avatar>
                }
                primaryText='questões'
              />
              <ListItem
                disabled={true}
                leftAvatar={
                  <Avatar
                    backgroundColor={blue500}
                    icon={
                      <FontIcon className='material-icons' color='#FFF' >
                        {countScore ? 'star' : 'star_border'}
                      </FontIcon>
                    }
                  />
                }
                primaryText={countScore ? `Valor: ${countScore} pontos` : 'Sem pontuação'}
              />
              <ListItem
                disabled={true}
                leftAvatar={
                  <Avatar
                    backgroundColor={blue500}
                    icon={
                      <Avatar backgroundColor={blue500}>
                        {
                          TestTimeoutTypes.getName(test.timeoutType) === 'Nenhum'
                          ? <FontIcon className='material-icons' color='#FFF' >
                              hourglass_empty
                            </FontIcon>
                          : moment.duration(test.timeout, 'seconds').humanize().match('[0-9]')
                          ? _.head(moment.duration(test.timeout, 'seconds').humanize().match('[0-9]'))
                          : <FontIcon className='material-icons' color='#FFF' >
                              hourglass_full
                            </FontIcon>
                        }
                      </Avatar>
                    }
                  />
                }
                primaryText={
                  TestTimeoutTypes.getName(test.timeoutType)  === 'Nenhum'
                  ? TestTimeoutTypes.getName(test.timeoutType)
                  : `${
                    moment.duration(test.timeout, 'seconds').humanize().match('[0-9]')
                  ? _.head(moment.duration(test.timeout, 'seconds').humanize().match('[a-z]'))
                  : moment.duration(test.timeout, 'seconds').humanize()} ${
                    TestTimeoutTypes.getName(test.timeoutType)}`
                }
              />
            </List>
          </CardText>
          <CardActions>
            <FlatButton
              primary={true}
              label='Ver'
              href={
                FlowRouter.path(
                  `TeacherTestShow${test.get('resolution')}`,
                  { testId: test._id, courseId: course._id }
                )
              }
            />
            <FlatButton
              secondary={true}
              label='Editar'
              href={FlowRouter.path('TeacherTest', { testId: test._id })}
            />
          </CardActions>
        </Card>
      </div>
    );
  },
});

export default TeacherCourseShowTestsCard;

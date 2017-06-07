import React from 'react';
import { Screen } from 'meteor/lsunsi:se-layouts';
import { Card, CardMedia, CardTitle, CardActions, Paper } from 'material-ui';
import { List, ListItem, Subheader, TextField, FlatButton } from 'material-ui';
import { blue700 } from 'material-ui/styles/colors';

StudentHomeOverview = React.createClass({
  mixins: [Screen],

  // Lifecycle

  getInitialState() {
    return { courseKey: '' };
  },

  // Handlers

  handlePressEnter(event) {
    if (event.keyCode == 13)
      this.handleSearch();
  },

  handleSearch() {
    FlowRouter.go('StudentCourseIngress', {}, { alias: this.state.courseKey });
  },

  handleKey(event, courseKey) {
    this.setState({ courseKey });
  },

  // Render

  render() {
    const { ready, courses } = this.props;
    const { innerHeight, courseKey } = this.state;

    return (
        <div
          className='ui container fluid'
          style={{ backgroundColor: blue700, height: innerHeight - 64, margin: '0 !important' }}
        >
           <div className='ui items'>
              <div className='item'>
                <div className='ui medium image'>
                  <img
                    src='/images/steps-students/seta.svg'
                    style={{ width: '300px', padding: '10px' }}
                  />
                </div>
               <div className='content' style={{ padding: 20 }}>
                 <Paper style={{ width: 293 }}>
                   <List>
                     <Subheader>Buscar Curso</Subheader>
                     <ListItem
                       disabled={true}
                       style={{ padding: '0px 16px 0px 16px' }}
                       children={
                          <TextField
                            key='text'
                            value={courseKey}
                            hintText='Chave do curso'
                            onChange={this.handleKey}
                            onKeyDown={this.handlePressEnter}
                          />
                        }
                     />
                     <ListItem
                       disabled={true}
                       style={{ padding: '0px 16px 0px 16px' }}
                       children={
                          <FlatButton
                            key='button'
                            secondary={true}
                            label='BUSCAR'
                            onTouchTap={this.handleSearch}
                          />
                        }
                     />
                   </List>
                </Paper>
              </div>
            </div>
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
                       href={FlowRouter.path('StudentCourseShow', { courseId: course._id })}
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

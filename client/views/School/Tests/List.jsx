import React from 'react';
import { List, ListItem, Paper, IconButton, IconMenu, MenuItem } from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { grey400 } from 'material-ui/styles/colors';

export default class SchoolTestsList extends React.Component {

  // Handlers

  handleDuplicateTest(event, testId) {
    event.stopPropagation();
    FlowRouter.go('SchoolTestCreateWithBase', { testId });
  }

  handleTest(event, testId) {
    FlowRouter.go('SchoolTest', { testId });
  }

  // Render

  render() {
    const { tests, courses } = this.props;

    return !tests.length ? null : (
      <Paper>
        <List>
         {_.map(tests, test =>
           <ListItem
             key={test._id}
             primaryText={test.name}
             secondaryText={
               <p>
                 <b>Curso: </b> {
                    !test.get('course')
                    ? 'Sem curso'
                    : `${_.get(_.find(courses, { _id: test.get('course') }), 'name')
                      } -- ${_.get(_.find(courses, { _id: test.get('course') }), 'alias')}`
                  }
                </p>
             }
             onTouchTap={(e) => this.handleTest(e, test._id)}
             rightIconButton={
                <IconMenu
                  iconButtonElement={
                    <IconButton
                      touch={true}
                      tooltip='Mais'
                      tooltipPosition="bottom-left"
                    >
                      <MoreVertIcon color={grey400} />
                    </IconButton>
                  }
                >
                  <MenuItem onTouchTap={(e) => this.handleDuplicateTest(e, test._id)} >
                    Duplicar
                  </MenuItem>
                </IconMenu>
              }
            />
         )}
        </List>
      </Paper>
    );
  }
};

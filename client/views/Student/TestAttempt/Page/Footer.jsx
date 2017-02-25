import React from 'react';
import { Paper, FontIcon } from 'material-ui';
import { BottomNavigation, BottomNavigationItem } from 'material-ui';

const StudentTestAttemptFooter = React.createClass({

  // render

  render() {
    const { test, question, index, parent } = this.props;

    return (
      <Paper zDepth={1} style={{ paddingTop: 10,
        paddingBottom: 0,
        position: 'fixed',
        bottom: 0,
        width: '100%',
      }} >
        <BottomNavigation>
          <BottomNavigationItem
            label='Voltar'
            icon={<FontIcon className='material-icons' >arrow_back</FontIcon>}
            onTouchTap={() => parent.handleForward()} />
          <BottomNavigationItem
            label={`Página ${index + 1}`}
            disabled={true}
            icon={<FontIcon className='material-icons' >book</FontIcon>} />
          <BottomNavigationItem
            label='Avançar'
            icon={<FontIcon className='material-icons' >arrow_forward</FontIcon>}
            onTouchTap={() => parent.handleBack()} />
        </BottomNavigation>
      </Paper>
    );
  },
});

export default StudentTestAttemptFooter;

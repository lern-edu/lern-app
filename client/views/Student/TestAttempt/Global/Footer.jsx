import React from 'react';
import { Paper, FontIcon } from 'material-ui';
import { BottomNavigation, BottomNavigationItem } from 'material-ui';

const StudentTestAttemptGlobalFooter = React.createClass({

  // render

  render() {
    const { test, pages, index, parent, answers } = this.props;

    return (
      <Paper zDepth={1} style={{
        paddingTop: 10,
        paddingBottom: 0,
        position: 'fixed',
        bottom: 0,
        width: '100%',
        zIndex: '10000',
      }} >
        <BottomNavigation
          selectedIndex={
            index < pages.answers.length - 1
            ? (
              _.every(pages.answers[index], ({ answer }) => !_.isNull(answer))
              ? 2
              : undefined
            ) : (
              _.every(answers, ({ answer }) => !_.isNull(answer))
              ? 2
              : undefined
            )
          }
        >
          <BottomNavigationItem
            label='Voltar'
            disabled={index == 0}
            icon={
              <FontIcon className='material-icons' >arrow_back</FontIcon>
            }
            onTouchTap={() => parent.handleBack()}
          />

          <BottomNavigationItem
            label={`Página ${index + 1}`}
            disabled={true}
            icon={
              <FontIcon className='material-icons' >book</FontIcon>
            }
          />

          <BottomNavigationItem
            label={index == pages.answers.length - 1 ? 'Terminar' : 'Avançar'}
            icon={
              <FontIcon className='material-icons' >arrow_forward</FontIcon>
            }
            onTouchTap={() => parent.handleForward()}
          />

        </BottomNavigation>
      </Paper>
    );
  },
});

export default StudentTestAttemptGlobalFooter;

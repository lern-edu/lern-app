import React from 'react';
import { Paper, FontIcon } from 'material-ui';
import { BottomNavigation, BottomNavigationItem } from 'material-ui';

const StudentTestAttemptPageFooter = React.createClass({

  // render

  render() {
    const { pages, index, parent, answers } = this.props;

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
              ? 1
              : undefined
            ) : (
              _.every(answers, ({ answer }) => !_.isNull(answer))
              ? 1
              : undefined
            )
          }
        >

          <BottomNavigationItem
            label={`Página ${index + 1}`}
            disabled={true}
            icon={
              <FontIcon className='material-icons' >book</FontIcon>
            }
          />

          <BottomNavigationItem
            label={index == pages.answers.length - 1 ? 'Terminar' : 'Avançar'}
            disabled={
              index < pages.answers.length - 1
              ? (
                _.every(pages.answers[index], ({ answer }) => !_.isNull(answer))
                ? false
                : true
              ) : (
                _.every(answers, ({ answer }) => !_.isNull(answer))
                ? false
                : true
              )
            }
            icon={
              <FontIcon className='material-icons' >arrow_forward</FontIcon>
            }
            onTouchTap={() => parent.finishAnswers()}
          />

        </BottomNavigation>
      </Paper>
    );
  },
});

export default StudentTestAttemptPageFooter;

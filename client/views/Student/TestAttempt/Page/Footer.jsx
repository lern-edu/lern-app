import React from 'react';
import { Paper, FontIcon } from 'material-ui';
import { BottomNavigation, BottomNavigationItem } from 'material-ui';

import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn />;

const StudentTestAttemptFooter = React.createClass({

  getInitialState() {
    return { selectedIndex: 0 };
  },

  // handlers

  handleForward() {
    const { index=0, test, answers, answer } = this.props;
    if (_.parseInt(index) < _.get(test, 'questions.length') - 1)
      FlowRouter.setParams({ index: _.parseInt(index) + 1 });

    // when you answer all questions you can finish
    if (_.isEqual(_.get(test, 'questions.length'), answers.length)
      && _.every(_.pullAllBy(answers, [{ _id: answer._id }], '_id'), 'finished'))
      this.finishAttempt();
  },

  handleBack() {
    const { index=0, test } = this.props;
    if (_.parseInt(index)) FlowRouter.setParams({ index: _.parseInt(index) - 1 });
  },

  select(x) {
    this.setState({ selectedIndex: x })
  },

  /* Get Context
  */

  contextTypes: {
    screen: React.PropTypes.string,
  },

  // render

  render() {
    const { test, question, index=0, answer } = this.props;
    const { screen } = this.context;

    return (
      <Paper zDepth={1}>
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
            label='Recents'
            icon={recentsIcon}
            onTouchTap={() => this.select(0)}
          />
          <BottomNavigationItem
            label='Favorites'
            icon={favoritesIcon}
            onTouchTap={() => this.select(1)}
          />
          <BottomNavigationItem
            label='Nearby'
            icon={nearbyIcon}
            onTouchTap={() => this.select(2)}
          />
        </BottomNavigation>
      </Paper>
    );
  },
});

export default StudentTestAttemptFooter;

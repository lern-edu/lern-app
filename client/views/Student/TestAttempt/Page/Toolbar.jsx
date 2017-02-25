import React from 'react';
import { Toolbar, ToolbarGroup, ToolbarTitle, IconButton, } from 'material-ui';
import { ToolbarSeparator, FontIcon, RaisedButton } from 'material-ui';

import StudentTestAttemptInfo from './Info.jsx';

const StudentTestAttemptToolbar = React.createClass({

  // Lifecycle

  componentDidMount() {
    const { test } = this.props;
    if (test.timeoutType != 'none') this.interval = setInterval(() => this.forceUpdate(), 1000);
  },

  componentWillUnmount() {
    const { test } = this.props;
    if (test.timeoutType != 'none') clearInterval(this.interval);
  },

  // Initial state

  getInitialState() { return { info: false }; },

  // handlers

  handleOpen(field) {
    const value = this.state[field];
    this.setState({ [field]: !value });
  },

  handleTime() {
    const { test, attempt, index, parent } = this.props;
    const timeTracked = _.get(attempt, `timeTracked[${index}]`);
    const now = _.now();
    const startTime = {
      page: _.get(timeTracked, 'startedAt'),
      global: attempt.startedAt,
    }[test.timeoutType];
    let remaining = (test.timeout || _.get(timeTracked, 'maxDuration')) + (startTime - now) / 1000;
    let expired = remaining < 0;

    if (expired) clearInterval(this.interval);

    return { label: expired ? 'Expirado' : numeral(remaining).format('00:00:00') };
  },

  // util

  finishAttempt() {
    const { test } = this.props;
    Meteor.call('StudentAttemptFinish', test._id, err => {
      if (err) {
        console.log(err);
        snack(':(');
      } else {
        snack('Enviado');
        FlowRouter.go('StudentTest', { testId: test._id });
      }
    });
  },

  // render

  render() {
    const { test } = this.props;
    const { info } = this.state;

    return (
      <Toolbar style={{
        marginTop: 64,
        paddingBottom: 10,
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: '1000',
      }}>
        <ToolbarGroup firstChild={true}>
          <IconButton
            onTouchTap={() => this.handleOpen('info')}
            children={<FontIcon className='material-icons' >info</FontIcon>}
            touch={true}
            tooltip='Informações'
            tooltipPosition='bottom-right' />
          <IconButton
            onTouchTap={() => this.handleOpen('help')}
            children={<FontIcon className='material-icons' >help</FontIcon>}
            touch={true}
            tooltip='Ajuda'
            tooltipPosition='bottom-right' />
        </ToolbarGroup>
        {test.timeoutType === 'none' ? undefined :
          <ToolbarGroup>
            <ToolbarTitle text={`Tempo ${i18n.__(`TestTimeoutTypes.${test.timeoutType}`)}`} />
            <ToolbarSeparator />
            <RaisedButton {...this.handleTime()} />
          </ToolbarGroup>
        }
        <StudentTestAttemptInfo
          open={info}
          test={test}
          handleClose={() => this.handleOpen('info')} />
      </Toolbar>
    );
  },

});

export default StudentTestAttemptToolbar;

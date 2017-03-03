import React from 'react';
import { Toolbar, ToolbarGroup, ToolbarTitle, IconButton, } from 'material-ui';
import { ToolbarSeparator, FontIcon, RaisedButton } from 'material-ui';

import StudentTestAttemptGlobalInfo from './Info.jsx';

const StudentTestAttemptGlobalToolbar = React.createClass({

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
    const { test, attempt, index, parent, pages } = this.props;
    const timeTracked = _.get(attempt, `timeTracked[${index}]`);

    const now = _.now();
    const startTime = attempt.startedAt;

    let remaining = test.timeout + (startTime - now) / 1000;
    const expired = attempt.get('finished');

    if (expired) parent.finishAttempt();

    return {
      label: expired ? 'Expirado' : numeral(remaining).format('00:00:00'),
      labelColor: 'white',
      buttonStyle: {
        backgroundColor: remaining > 60 ? '#8BC34A' : remaining > 10 ? '#FFC107' : '#F44336',
      },
    };
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
        <StudentTestAttemptGlobalInfo
          open={info}
          test={test}
          handleClose={() => this.handleOpen('info')} />
      </Toolbar>
    );
  },

});

export default StudentTestAttemptGlobalToolbar;

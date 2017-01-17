import React from 'react';
import { Stepper, Step, StepLabel } from 'material-ui';

const AdminUserCreateFormSteps = React.createClass({

  /* Render
  */

  render() {
    const { index } = this.props;

    return (
      <Stepper activeStep={index}>
        <Step>
          <StepLabel>Básico</StepLabel>
        </Step>
        <Step>
          <StepLabel>Complementar</StepLabel>
        </Step>
      </Stepper>
    );
  },
});

export default AdminUserCreateFormSteps;

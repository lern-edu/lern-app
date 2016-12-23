import React from 'react';
import { RadioButtonGroup, RadioButton } from 'material-ui';

PublicContactFormRadio = React.createClass({

  /* Handlers
  */

  handleRadioChange(__, value) {
    FlowRouter.setQueryParams({ type: value });
  },

  /* Render
  */

  render() {
    const { value } = this.props;

    return (
      <RadioButtonGroup name='contact-type' defaultSelected={value} onChange={this.handleRadioChange}>
        <RadioButton value='question' label='Fazer uma pergunta'/>
        <RadioButton value='report' label='Reportar um erro'/>
        <RadioButton value='other' label='Outro'/>
      </RadioButtonGroup>
    );
  },
});

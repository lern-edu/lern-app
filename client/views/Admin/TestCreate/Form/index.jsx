// Libs
import React from 'react';
import { Stepper, Step, StepLabel, StepContent } from 'material-ui';

// Views
import AdminTestCreateFormBasic from './Basic/Basic.jsx';
import AdminTestCreateFormTheme from './Theme/ThemeContainer.jsx';
import AdminTestCreateFormApplication from './Application/ApplicationContainer.jsx';
import AdminTestCreateFormTiming from './Timing/Timing.jsx';
import AdminTestCreateFormPage from './Page/Page.jsx';

const AdminTestCreateForm = React.createClass({
  mixins: [AstroForm(Tests.Schema, 'AdminTestSave')],

  // Handlers

  handleSubmitSuccess({ _id }) {
    console.log(`Test created: ${_id}`);
    snack('Teste criado');
    FlowRouter.go('AdminTest', _id);
  },

  /* Lifecycle
  */

  getInitialState() {
    return { index: 4, allTags: false, noCourse: false, scored: false };
  },

  componentDidMount() {
    this.defaultHandler({ type: 'course' }, { doc: true });
  },

  /* Methods
  */

  nextStep() {
    const { index } = this.state;
    this.setState({ index: index + 1 });
  },

  prevStep() {
    const { index } = this.state;
    this.setState({ index: index - 1 });
  },

  /* Render
  */

  render() {
    const { state: { index } } = this;

    // const done = {
    //   basic: !_.some(['name', 'info'],
    //     k => _.get(this, `state.errors[${k}]`)),
    //   theme: !_.some(['tags', 'subjects'],
    //     k => _.get(this, `state.errors[${k}]`)),
    //   application: !_.some(['course', 'students', 'endDate', 'startDate'],
    //     k => _.get(this, `state.errors[${k}]`)),
    //   timing: !_.some(['timeoutType', 'timeout'],
    //     k => _.get(this, `state.errors[${k}]`)),
    //   pages: !_.some(['timeout', 'questions', 'pages', 'scores'],
    //     k => _.get(this, `state.errors[${k}]`)),
    // };

    const done = {
      basic: true,
      theme: true,
      application: true,
      timing: true,
      pages: true,
    };

    return (
      <div className='ui basic segment'>

        <Stepper activeStep={index} orientation='vertical' >

          <Step completed={done.basic}>
            <StepLabel>Informações</StepLabel>
            <StepContent>
              <AdminTestCreateFormBasic
                errors={this.state.errors}
                done={done.basic}
                {...this.props}
                form={this}
                key='basic' />
            </StepContent>
          </Step>

          <Step completed={done.theme}>
            <StepLabel>Temas</StepLabel>
            <StepContent>
              <AdminTestCreateFormTheme
                errors={this.state.errors}
                done={done.theme}
                {...this.props}
                form={this}
                key='theme' />
            </StepContent>
          </Step>

          <Step completed={done.application}>
            <StepLabel>Aplicação</StepLabel>
            <StepContent>
              <AdminTestCreateFormApplication
                errors={this.state.errors}
                done={done.application}
                key='application'
                {...this.props}
                form={this} />
            </StepContent>
          </Step>

          <Step completed={done.timing}>
            <StepLabel>Cronometrô</StepLabel>
            <StepContent>
              <AdminTestCreateFormTiming
                errors={this.state.errors}
                done={done.timing}
                key='timing'
                form={this} />
            </StepContent>
          </Step>

          <Step completed={done.pages}>
            <StepLabel>Conteúdo</StepLabel>
            <StepContent>
              <AdminTestCreateFormPage
                errors={this.state.errors}
                scored={this.state.scored}
                done={done.pages}
                {...this.props}
                key='pages'
                form={this} />
            </StepContent>
          </Step>

        </Stepper>

      </div>
    );
  },
});

export default AdminTestCreateForm;

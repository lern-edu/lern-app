// Libs
import React from 'react';
import { StepContent, FontIcon, FloatingActionButton } from 'material-ui';
import { Stepper, Step, StepButton } from 'material-ui';

// Views
import AdminTestFormBasic from './Basic/Basic.jsx';
import AdminTestFormTheme from './Theme/ThemeContainer.jsx';
import AdminTestFormApplication from './Application/ApplicationContainer.jsx';
import AdminTestFormTiming from './Timing/Timing.jsx';
import AdminTestFormPage from './Page/Page.jsx';

const AdminTestForm = React.createClass({
  mixins: [AstroForm(Tests.Schema, 'AdminTestSave')],

  // Styles

  styles: {
    floatingButton: {
      className: 'ui right aligned basic segment',
      style: { position: 'fixed', bottom: '1em', right: '1em', zIndex: '1000' },
    },
  },

  // Handlers

  handleSubmitSuccess({ _id: testId }) {
    console.log(`Test created: ${testId}`);
    snack('Teste atualizado');
    FlowRouter.go('AdminTest', { testId });
  },

  /* Lifecycle
  */

  getInitialState() {
    return { index: 0, allTags: false, noCourse: false, scored: false };
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
    const { state: { index, valid } } = this;

    const done = {
      basic: !_.some(['name', 'info'],
        k => _.get(this, `state.errors[${k}]`)),
      theme: !_.some(['tags', 'subjects'],
        k => _.get(this, `state.errors[${k}]`)),
      application: !_.some(['course', 'students', 'endDate', 'startDate'],
        k => _.get(this, `state.errors[${k}]`)),
      timing: !_.some(['timeoutType', 'timeout'],
        k => _.get(this, `state.errors[${k}]`)),
      pages: !_.some(['timeout', 'questions', 'pages', 'scores'],
        k => _.get(this, `state.errors[${k}]`)),
    };

    return (
      <div className='ui basic segment'>

        <Stepper linear={false} activeStep={index} orientation='vertical' >

          <Step completed={done.basic}>
            <StepButton onClick={() => this.setState({ index: 0 })}>
              Informações
            </StepButton>
            <StepContent>
              <AdminTestFormBasic
                errors={this.state.errors}
                done={done.basic}
                {...this.props}
                form={this}
                key='basic' />
            </StepContent>
          </Step>

          <Step completed={done.theme}>
            <StepButton onClick={() => this.setState({ index: 1 })}>
              Temas
            </StepButton>
            <StepContent>
              <AdminTestFormTheme
                errors={this.state.errors}
                done={done.theme}
                {...this.props}
                form={this}
                key='theme' />
            </StepContent>
          </Step>

          <Step completed={done.application}>
            <StepButton onClick={() => this.setState({ index: 2 })}>
              Aplicação
            </StepButton>
            <StepContent>
              <AdminTestFormApplication
                errors={this.state.errors}
                done={done.application}
                key='application'
                {...this.props}
                form={this} />
            </StepContent>
          </Step>

          <Step completed={done.timing}>
            <StepButton onClick={() => this.setState({ index: 3 })}>
              Cronômetro
            </StepButton>
            <StepContent>
              <AdminTestFormTiming
                errors={this.state.errors}
                done={done.timing}
                key='timing'
                form={this} />
            </StepContent>
          </Step>

          <Step completed={done.pages}>
            <StepButton onClick={() => this.setState({ index: 4 })}>
              Conteúdo
            </StepButton>
            <StepContent>
              <AdminTestFormPage
                errors={this.state.errors}
                scored={this.state.scored}
                done={done.pages}
                {...this.props}
                key='pages'
                form={this} />
            </StepContent>
          </Step>

        </Stepper>

        <div {...this.styles.floatingButton} >
          <FloatingActionButton
            disabled={!valid}
            onTouchTap={this.defaultSubmit}
            children={<FontIcon className='material-icons' >check</FontIcon>} />
        </div>

      </div>
    );
  },
});

export default AdminTestForm;

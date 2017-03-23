// Libs
import React from 'react';
import { Stepper, Step, StepLabel, StepContent } from 'material-ui';

// Views
import SchoolCourseCreateFormBasic from './Basic/Basic.jsx';
import SchoolCourseCreateFormTheme from './Theme/ThemeContainer.jsx';
import SchoolCourseCreateFormTimeBounds from './TimeBounds/TimeBounds.jsx';
import SchoolCourseCreateFormPeople from './People/PeopleContainer.jsx';
import SchoolCourseCreateFormSchedule from './Schedule/Schedule.jsx';

const SchoolCourseCreateForm = React.createClass({
  mixins: [AstroForm(Courses.Schema, 'SchoolCourseCreate')],

  /* Lifecycle
  */

  getInitialState() {
    return { subjects: [], index: 0, allTags: false, waitingCallback: false };
  },

  /* Handlers
  */

  handleSubmit() {
    this.setState({ waitingCallback: true });
    form.defaultSubmit();
  },

  handleSubmitError() {
    this.setState({ waitingCallback: false });
    snack('Problemas ao iniciar curso');
  },

  handleSubmitSuccess({ _id }) {
    console.log(`Course created: ${_id}`);
    this.setState({ waitingCallback: false });
    snack('Curso criado');
    FlowRouter.go('SchoolCourse', { courseId: _id });
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
    const { state: { index, errors, valid, waitingCallback } } = this;

    const done = {
      basic: !_.some(['name', 'info'],
        k => _.get(this, `state.errors[${k}]`)),
      theme: !_.some(['tags', 'subjects'],
        k => _.get(this, `state.errors[${k}]`)),
      timeBounds: !_.some(['endDate', 'startDate'],
        k => _.get(this, `state.errors[${k}]`)),
      people: !_.some(['teachers', 'students'],
        k => _.get(this, `state.errors[${k}]`)),
    };

    return (
      <div className='ui basic segment'>

        <Stepper activeStep={index} orientation='vertical' >

          <Step completed={done.basic}>
            <StepLabel>Informações</StepLabel>
            <StepContent>
              <SchoolCourseCreateFormBasic
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
              <SchoolCourseCreateFormTheme
                errors={this.state.errors}
                done={done.theme}
                {...this.props}
                form={this}
                key='theme' />
            </StepContent>
          </Step>

          <Step completed={done.timeBounds}>
            <StepLabel>Duração</StepLabel>
            <StepContent>
              <SchoolCourseCreateFormTimeBounds
                errors={this.state.errors}
                done={done.timeBounds}
                key='timeBounds'
                {...this.props}
                form={this} />
            </StepContent>
          </Step>

          <Step completed={done.people}>
            <StepLabel>Pessoas</StepLabel>
            <StepContent>
              <SchoolCourseCreateFormPeople
                errors={this.state.errors}
                done={done.people}
                key='people'
                form={this} />
            </StepContent>
          </Step>

          <Step completed={done.schedule}>
            <StepLabel>Cronograma</StepLabel>
            <StepContent>
              <SchoolCourseCreateFormSchedule
                errors={this.state.errors}
                done={valid && !waitingCallback}
                key='schedule'
                form={this} />
            </StepContent>
          </Step>

        </Stepper>

      </div>
    );
  },
});

export default SchoolCourseCreateForm;
